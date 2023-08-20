const preloadImages = (...srcs: string[]): HTMLImageElement[] => {
    return srcs.map((src) => {
        const img = new Image();
        
        img.src = src;
        
        return img;
    });
};

export default preloadImages;