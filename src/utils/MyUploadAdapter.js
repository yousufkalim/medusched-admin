import axios from 'axios';
import { mediaUrl } from '../config';

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('image', file);

          axios.post(`${mediaUrl}/images`, formData).then((res) => {
            console.log(res);
            resolve({
              default: mediaUrl + res.data.image,
            });
          });
        }),
    );
  }
}

export default MyUploadAdapter;
