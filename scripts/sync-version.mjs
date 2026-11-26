import fs from "node:fs";

/** @type {unknown} */
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (
  typeof pkg !== "object" ||
  pkg === null ||
  !("version" in pkg) ||
  typeof pkg.version !== "string"
) {
  throw new Error("package.json is missing a version");
}
const version = pkg.version;

const tokensPath = "tokens.json";
const tokensSource = fs.readFileSync(tokensPath, "utf8");
const versionPattern = /"version": "[^"]*"/;
if (!versionPattern.test(tokensSource)) throw new Error("tokens.json is missing a version field");
const nextTokens = tokensSource.replace(versionPattern, `"version": "${version}"`);
if (!nextTokens.includes(`"version": "${version}"`))
  throw new Error("tokens.json version was not updated");
fs.writeFileSync(tokensPath, nextTokens);

const skillPath = "skills/uni-helper-design/SKILL.md";
const skill = fs.readFileSync(skillPath, "utf8");
const nextSkill = skill.replace(/^  version: (["'])[^"']*\1$/m, `  version: "${version}"`);
if (!nextSkill.includes(`version: "${version}"`))
  throw new Error("SKILL.md version was not updated");
fs.writeFileSync(skillPath, nextSkill);

const galleryPath = "components/index.html";
const gallery = fs.readFileSync(galleryPath, "utf8");
const nextGallery = gallery
  .replace(/Design system \d+\.\d+\.\d+/, `Design system ${version}`)
  .replace(/uni-helper design \d+\.\d+\.\d+ · MIT/, `uni-helper design ${version} · MIT`);
if (
  !nextGallery.includes(`Design system ${version}`) ||
  !nextGallery.includes(`uni-helper design ${version} · MIT`)
)
  throw new Error("components/index.html version was not updated");
fs.writeFileSync(galleryPath, nextGallery);
