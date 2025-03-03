class AssetLoader {
    constructor() {
        this.manifest = null;
        this.baseUrl = window.location.origin;
    }

    async init() {
        try {
            const response = await fetch('/assets/manifest.json');
            this.manifest = await response.json();
        } catch (error) {
            console.error('Failed to load asset manifest:', error);
        }
    }

    getImageUrl(path) {
        if (!this.manifest) return null;
        return `${this.baseUrl}${path}`;
    }

    getProductImageUrl(productId, index = 0) {
        return `${this.baseUrl}/assets/images/products/${productId}_${index}.jpg`;
    }

    getAvatarUrl(userId) {
        return `${this.baseUrl}/assets/images/avatars/${userId}.jpg`;
    }

    getFontUrl(fontName, weight = 'regular') {
        if (!this.manifest?.fonts[fontName]?.[weight]) return null;
        return `${this.baseUrl}${this.manifest.fonts[fontName][weight]}`;
    }
}

export const assetLoader = new AssetLoader();
