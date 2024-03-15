import Image from "next/image";
import { FaDownload } from "react-icons/fa";

export default function FileViewer({ file, API_URL }) {
  const isImage = /\.(jpe?g|png|gif|bmp)$/i.test(file.fileName);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(file.fileName);
  const isPdf = /\.pdf$/i.test(file.fileName);

  if (isImage) {
    return (
      <div className="rounded-lg ring-1">
        <Image className="rounded-lg p-2" src={`${API_URL}${file.filePath}`} alt={file.fileName} width={200} height={200} />
        <a className="flex gap-2 p-2 text-xs text-gray-500" href={`${API_URL}${file.filePath}`} download={file.fileName}>
          <FaDownload /> Download {file.fileName}
        </a>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div>
        <video width="320" height="240" controls>
          <source src={`${API_URL}${file.filePath}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a className="flex gap-2 p-2 text-xs text-gray-500" href={`${API_URL}${file.filePath}`} download={file.fileName}>
          <FaDownload /> Download {file.fileName}
        </a>
      </div>
    );
  }

  if (isPdf) {
    return (
      <div>
        <a className="flex gap-2 p-2 text-xs text-gray-500" href={`${API_URL}${file.filePath}`} download={file.fileName}>
          <FaDownload /> Download {file.fileName}
        </a>
      </div>
    );
  }

  return null;
}
