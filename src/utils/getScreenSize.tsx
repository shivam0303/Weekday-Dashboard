function getScreenSize(): "small" | "medium" | "large" | "extralarge" {
    const width = window.innerWidth;

    if (width < 600) {
        return "small";
    } else if (width < 960) {
        return "medium";
    } else if (width < 1280) {
        return "large";
    } else {
        return "extralarge";
    }
}

export { getScreenSize };
