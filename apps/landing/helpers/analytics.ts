declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export const GA_MEASUREMENT_ID = "G-MD9R6R04MK";

export const pageview = (url: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};


export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value: number }) => {
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};