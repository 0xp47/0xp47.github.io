import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import dns from 'node:dns';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // ignore
}

let token = process.env.PORTFOLIO_PAT || process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;

// Try reading local .env file
try {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*(PORTFOLIO_PAT|GITHUB_PAT|GITHUB_TOKEN)\s*=\s*(.*)\s*$/);
      if (match) {
        token = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
} catch {
  // ignore
}

// Check if GitHub CLI (`gh`) is available and authenticated
let hasGhCli = false;
try {
  const status = execFileSync('gh', ['auth', 'status'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    timeout: 3000
  });
  if (status && status.includes('Logged in to github.com')) {
    hasGhCli = true;
    console.log('Detected authenticated GitHub CLI (gh). Using gh for fast, reliable API sync.');
  }
} catch {
  hasGhCli = false;
}

if (!hasGhCli && !token) {
  try {
    const ghToken = execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 3000
    }).trim();
    if (ghToken && ghToken.startsWith('gh')) {
      token = ghToken;
      console.log('Retrieved token from GitHub CLI.');
    }
  } catch {
    // ignore
  }
}

// Universal API request helper
function callGithubApi(endpoint) {
  if (hasGhCli) {
    try {
      const output = execFileSync('gh', ['api', endpoint], {
        encoding: 'utf8',
        maxBuffer: 20 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
        timeout: 8000
      });
      return JSON.parse(output);
    } catch {
      return null;
    }
  }
  return null;
}

async function fetchRepos() {
  console.log("Fetching repositories from GitHub for 0xp47...");
  try {
    let rawRepos = callGithubApi('user/repos?per_page=100&type=owner');
    if (!rawRepos || !Array.isArray(rawRepos)) {
      rawRepos = callGithubApi('users/0xp47/repos?per_page=100');
    }

    if (!Array.isArray(rawRepos)) {
      throw new Error("Invalid response from GitHub: expected an array of repositories");
    }

    console.log(`Successfully fetched ${rawRepos.length} raw repositories from GitHub.`);

    const repos = [];
    for (const repo of rawRepos) {
      if (repo.fork) continue; // skip forks

      // Determine category
      const topics = repo.topics || [];
      const lang = (repo.language || "").toLowerCase();
      const repoName = (repo.name || "").toLowerCase();

      // Manual overrides for known repos
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

      // Only fetch README content for public repositories
      let readme = "";
      if (!repo.private) {
        try {
          const readmeData = callGithubApi(`repos/${repo.owner.login}/${repo.name}/readme`);
          if (readmeData && readmeData.content && readmeData.encoding === "base64") {
            readme = Buffer.from(readmeData.content, 'base64').toString('utf8');
            readme = readme.replace(/0xp47\.github\.io/g, "jaypatrickcano.dev");
          }
        } catch {
          // README might not exist for some repos, which is fine
        }
      }

      let liveUrl = repo.homepage || repo.html_url;
      if (repoName === "0xp47.github.io") {
        liveUrl = "https://jaypatrickcano.dev/";
      }

      repos.push({
        name: repo.name,
        category: category,
        description: repo.description || "A project built by 0xp47.",
        stack: stack,
        github: repo.html_url,
        live: liveUrl,
        isPrivate: repo.private,
        readme: repo.private ? "" : readme,
        createdAt: repo.created_at,
        updatedAt: repo.pushed_at || repo.updated_at,
        stars: repo.stargazers_count || 0,
      });
    }

    // Sort repositories alphabetically
    repos.sort((a, b) => a.name.localeCompare(b.name));

    const outputPath = path.resolve('src/lib/projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(repos, null, 2), 'utf8');
    console.log(`Successfully saved ${repos.length} parsed projects to ${outputPath}`);

    // --- Compute and save GitHub stats ---
    const totalProjects = rawRepos.filter((r) => !r.fork).length;
    const publicRepos = rawRepos.filter((r) => !r.fork && !r.private).length;
    const totalStars = rawRepos.filter((r) => !r.fork).reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // Fetch user profile for followers
    let followers = 0;
    try {
      const userData = callGithubApi('user') || callGithubApi('users/0xp47');
      if (userData && typeof userData.followers === 'number') {
        followers = userData.followers;
      }
    } catch {
      // ignore
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
    const projectsPath = path.resolve('src/lib/projects.json');
    const statsPath = path.resolve('src/lib/github-stats.json');
    if (fs.existsSync(projectsPath) && fs.existsSync(statsPath)) {
      console.warn("Using existing cached repository data.");
    } else {
      process.exit(1);
    }
  }
}

fetchRepos();
