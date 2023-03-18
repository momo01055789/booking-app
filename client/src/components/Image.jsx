export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://booking-app-hky1.onrender.com/Uploads/" + src;
  return <img {...rest} src={src} alt={""} />;
}
