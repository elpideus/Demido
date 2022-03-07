module.exports = async (url) => {
    const domain = (new URL(url));
    if (domain.hostname.includes("youtube.com") || domain.hostname.includes("youtu.be")) return "YouTube";
    if (domain.hostname.includes("soundcloud.com")) return "SoundCloud";
    return "Here";
}