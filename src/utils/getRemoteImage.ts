const REMOTE_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&';

type IFlickrData = {
    items: { media: { m: string } }[]
}

let global_id = 1;

const getRemoteImage = (query: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const elem = document.createElement('script');
        const id = `getRemoteImageJsonCallback${global_id++}`;
        const win = (window as unknown as Record<string, (data: IFlickrData) => void>);
        
        win[id] = (data: IFlickrData) => {
            resolve(data.items[0]?.media.m.replace('_m', '_b') || '');
        };
        elem.onload = () => {
            elem.remove();
            delete win[id];
        };
        elem.onerror = reject;
        
        elem.src = `${REMOTE_URL}jsoncallback=${id}&tags=${query}`;
        document.head.appendChild(elem);
    });
};

export default getRemoteImage;