import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
        .then((bootstrap) => {
          // Bootstrap JS yüklendikten sonra yapılacak işlemler
        })
        .catch((error) => {
          console.error('Bootstrap yüklenirken bir hata oluştu:', error);
        });
    }
  }, []);

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
