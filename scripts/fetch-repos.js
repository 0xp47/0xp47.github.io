import fs from 'fs';
import path from 'path';

let token = process.env.PORTFOLIO_PAT || process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;

// Try reading local .env file
try {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*(PORTFOLIO_PAT|GITHUB_PAT)\s*=\s*(.*)\s*$/);
      if (match) {
        token = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
} catch (e) {
  console.log("No .env file found or error reading it:", e.message);
}

if (!token) {
  const projectsPath = path.resolve('src/lib/projects.json');
  const statsPath = path.resolve('src/lib/github-stats.json');
  if (fs.existsSync(projectsPath) && fs.existsSync(statsPath)) {
    console.warn("Warning: PORTFOLIO_PAT is not set. Using cached local repository data to prevent build failure.");
    process.exit(0); // Exit cleanly
  } else {
    console.error("Error: PORTFOLIO_PAT is not set and no cached local data was found. Please set it in your environment or in a .env file.");
    process.exit(1);
  }
}

async function fetchRepos() {
  console.log("Fetching repositories from GitHub...");
  try {
    let page = 1;
    let rawRepos = [];
    while (true) {
      const response = await fetch(`https://api.github.com/user/repos?per_page=100&type=owner&page=${page}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github+json",
          "User-Agent": "0xp47-Portfolio-Builder"
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`GitHub API returned status ${response.status}: ${errText}`);
      }

      const pageRepos = await response.json();
      if (!pageRepos || pageRepos.length === 0) {
        break;
      }
      rawRepos = rawRepos.concat(pageRepos);
      page++;
    }
    console.log(`Successfully fetched ${rawRepos.length} raw repositories.`);

    const repos = [];
    for (const repo of rawRepos) {
      if (repo.fork) continue; // skip forks

      // Determine category
      const topics = repo.topics || [];
      const lang = (repo.language || "").toLowerCase();
      const repoName = (repo.name || "").toLowerCase();

      // Manual overrides for known repos (most reliable)
      const categoryOverrides = {
        "0xp47": "Web",                       // GitHub profile readme
        "0xp47.github.io": "Web",             // Portfolio site (Next.js)
        "exploitlabs": "Tool",                // Pen-testing scripts
        "hirehub-ph": "Web",                  // PHP job portal
        "leafsense": "Mobile",                // Expo mobile app
        "linkedin-autopilot": "Tool",         // Playwright automation bot
        "micro-downloader": "Tool",           // Desktop GUI downloader
        "moe-llm-from-scratch": "AI/ML",      // PyTorch LLM
        "pos-and-inventory-system": "Web",     // TypeScript POS web app
        "unified-api-server": "Web",           // FastAPI backend service
        "windows-user-profile-renamer": "Tool",// PowerShell toolkit
        "xampp-repair-tool": "Tool",           // PowerShell CLI recovery
      };

      let category = categoryOverrides[repoName];

      // Auto-detection fallback for new/unknown repos
      if (!category) {
        // Helper: check if any keyword appears in topics array
        const topicHas = (kws) => kws.some((k) => topics.includes(k));

        if (
          topicHas(["mobile", "react-native", "expo", "flutter", "android", "ios", "swift", "kotlin"])
        ) {
          category = "Mobile";
        } else if (
          topicHas(["cli", "powershell", "bash", "shell", "desktop-app", "tkinter",
                    "electron", "utility", "repair", "recovery-tool",
                    "penetration-testing", "cybersecurity", "exploit",
                    "video-downloader", "scraper"]) ||
          (topicHas(["automation"]) && !topicHas(["ai", "ml", "deep-learning", "llm"])) ||
          ["powershell", "batchfile", "shell"].includes(lang)
        ) {
          category = "Tool";
        } else if (
          topicHas(["deep-learning", "machine-learning", "llm", "neural-network",
                    "mixture-of-experts", "computer-vision", "nlp", "tensorflow",
                    "pytorch", "gpt", "transformer", "ai-model"])
        ) {
          category = "AI/ML";
        } else {
          category = "Web";
        }
      }

      // Determine tech stack from language and topics
      let stack = [];
      if (repo.language) {
        stack.push(repo.language);
      }
      for (const topic of topics) {
        let cleanTopic = topic;
        if (topic === "nextjs") cleanTopic = "Next.js";
        else if (topic === "reactjs" || topic === "react") cleanTopic = "React";
        else if (topic === "typescript") cleanTopic = "TypeScript";
        else if (topic === "javascript") cleanTopic = "JavaScript";
        else if (topic === "tailwindcss" || topic === "tailwind") cleanTopic = "Tailwind CSS";
        else if (topic === "nodejs" || topic === "node") cleanTopic = "Node.js";
        else if (topic === "mongodb") cleanTopic = "MongoDB";
        else if (topic === "postgresql" || topic === "postgres") cleanTopic = "PostgreSQL";
        else if (topic === "docker") cleanTopic = "Docker";
        else if (topic === "aws") cleanTopic = "AWS";
        else if (topic === "react-native") cleanTopic = "React Native";
        else if (topic === "expo") cleanTopic = "Expo";
        else if (topic === "prisma") cleanTopic = "Prisma";
        else if (topic === "supabase") cleanTopic = "Supabase";
        else {
          cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
        }
        if (!stack.includes(cleanTopic)) {
          stack.push(cleanTopic);
        }
      }

      if (stack.length > 5) {
        stack = stack.slice(0, 5);
      }
      if (stack.length === 0) {
        stack = ["Web Tech"];
      }

      // Fetch README content dynamically at compile time
      let readme = "";
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "User-Agent": "0xp47-Portfolio-Builder"
          }
        });
        if (readmeRes.ok) {
          const readmeData = await readmeRes.json();
          if (readmeData.content && readmeData.encoding === "base64") {
            // Base64 decode to UTF-8
            readme = Buffer.from(readmeData.content, 'base64').toString('utf8');
          }
        }
      } catch (e) {
        console.log(`Could not fetch README for ${repo.name}:`, e.message);
      }

      repos.push({
        name: repo.name,
        category: category,
        description: repo.description || "A project built by 0xp47.",
        stack: stack,
        github: repo.html_url,
        live: repo.homepage || repo.html_url,
        isPrivate: repo.private,
        readme: repo.private ? "" : readme,
      });
    }

    // Sort repositories alphabetically
    repos.sort((a, b) => a.name.localeCompare(b.name));

    const outputPath = path.resolve('src/lib/projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(repos, null, 2), 'utf8');
    console.log(`Saved ${repos.length} parsed projects to ${outputPath}`);

    // --- Compute and save GitHub stats ---
    const totalProjects = rawRepos.filter((r) => !r.fork).length;
    const publicRepos = rawRepos.filter((r) => !r.fork && !r.private).length;
    const totalStars = rawRepos.filter((r) => !r.fork).reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // Fetch user profile for followers
    let followers = 0;
    try {
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github+json",
          "User-Agent": "0xp47-Portfolio-Builder"
        }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        followers = userData.followers || 0;
      }
    } catch (e) {
      console.log("Could not fetch user profile for followers:", e.message);
    }

    const stats = {
      totalProjects,
      publicRepos,
      totalStars,
      followers,
      updatedAt: new Date().toISOString(),
    };

    const statsPath = path.resolve('src/lib/github-stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');
    console.log(`Saved GitHub stats to ${statsPath}:`, stats);
  } catch (error) {
    console.error("Failed to fetch and process repositories:", error.message);
    process.exit(1);
  }
}

fetchRepos();

