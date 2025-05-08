import {useEffect, useState} from "react";
import Image, { ImageProps } from "next/image";

const ImageWithLoader = ({ src, alt, ...props }: ImageProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
    }, [src]);

    return (
        <>
            {loading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg">
                    <span className="animate-spin rounded-full border-4 border-lightPrimary dark:border-darkPrimary border-t-transparent w-8 h-8"></span>
                </div>
            )}

            {!error ? (
                <Image
                    src={src}
                    alt={alt}
                    {...props} // Spread all properties dynamically
                    className={`absolute transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"} ${props.className || ""}`}
                    onLoadingComplete={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                    placeholder={props.placeholder || "blur"} // Default to blur placeholder
                    blurDataURL={props.blurDataURL || "/blur-placeholder.jpg"} // Default blur image
                />
            ) : (
                <div className="text-center text-gray-500">⚠️ Failed to load image</div>
            )}
        </>
    );
};

export default ImageWithLoader;
