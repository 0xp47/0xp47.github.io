import fs from 'fs';
import path from 'path';

const CREDLY_USER = '0xp47';
const BADGES_API_URL = `https://www.credly.com/users/${CREDLY_USER}/badges.json`;

const categoryMap = {
  "Core Generative AI Skills": "AI",
  "Introduction to Modern AI": "AI",
  "Prompt Like an Engineer": "AI",
  "Ethical Hacker": "Security",
  "Introduction to Cybersecurity": "Security",
  "JavaScript Essentials 1": "Development",
  "Python Essentials 1": "Development",
  "Networking Basics": "Systems & Networks",
  "Operating Systems Basics": "Systems & Networks",
  "Operating Systems Support": "Systems & Networks",
  "Computer Hardware Basics": "Systems & Networks",
  "Introduction to IoT": "Systems & Networks",
};

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.warn(`Failed to download image from ${url}:`, err.message);
    return false;
  }
}

async function fetchBadges() {
  console.log(`Fetching Credly badges for user "${CREDLY_USER}"...`);

  const badgesDir = path.resolve('public/images/badges');
  if (!fs.existsSync(badgesDir)) {
    fs.mkdirSync(badgesDir, { recursive: true });
  }

  const outputPath = path.resolve('src/lib/certifications.json');
  let existingData = [];
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    } catch {
      // ignore
    }
  }

  try {
    const response = await fetch(BADGES_API_URL, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "0xp47-Portfolio-Builder",
      },
    });

    if (!response.ok) {
      throw new Error(`Credly API returned status ${response.status}`);
    }

    const json = await response.json();
    const rawBadges = json.data || [];
    console.log(`Fetched ${rawBadges.length} badges from Credly.`);

    const certifications = [];

    for (const b of rawBadges) {
      const template = b.badge_template || {};
      const id = b.id;
      const title = template.name;
      const issuerName = template.issuer?.entities?.[0]?.entity?.name || b.issuer?.summary || "Cisco";
      const issuedAt = b.issued_at_date || b.issued_at?.slice(0, 10);
      const credlyUrl = `https://www.credly.com/badges/${id}`;
      const remoteImageUrl = template.image_url;
      const slug = template.vanity_slug || id;
      const localImageName = `${slug}.png`;
      const localImagePath = path.join(badgesDir, localImageName);
      const publicImagePath = `/images/badges/${localImageName}`;

      // Download image locally if not already present or zero byte
      let hasLocalImage = false;
      if (fs.existsSync(localImagePath) && fs.statSync(localImagePath).size > 0) {
        hasLocalImage = true;
      } else if (remoteImageUrl) {
        const ok = await downloadImage(remoteImageUrl, localImagePath);
        hasLocalImage = ok;
      }

      const category = categoryMap[title] || "General";
      const skills = (template.skills || []).map((s) => s.name);

      certifications.push({
        id,
        title,
        issuer: issuerName,
        organization: "Cisco Networking Academy",
        issueDate: issuedAt,
        badgeUrl: credlyUrl,
        imageUrl: hasLocalImage ? publicImagePath : remoteImageUrl,
        remoteImageUrl,
        activityUrl: template.global_activity_url || null,
        category,
        skills,
        description: template.description || "",
      });
    }

    // Sort by issue date descending
    certifications.sort((a, b) => b.issueDate.localeCompare(a.issueDate));

    fs.writeFileSync(outputPath, JSON.stringify(certifications, null, 2), 'utf8');
    console.log(`Successfully saved ${certifications.length} certifications to ${outputPath}`);
  } catch (error) {
    console.warn("Could not fetch latest badges from Credly:", error.message);
    if (existingData.length > 0) {
      console.log(`Using existing ${existingData.length} cached certifications.`);
    } else {
      console.error("No cached certifications found.");
    }
  }
}

fetchBadges();
