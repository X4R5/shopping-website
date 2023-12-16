import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS dosyasını içe aktarın // Bootstrap JavaScript dosyasını içe aktarın
import '../styles/style.css';

function MyApp({ Component, pageProps }) {

if (typeof window === 'undefined') {

  }

  if (typeof window !== 'undefined') {

    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then((bootstrap) => {

      })
      .catch((error) => {
        console.error('Bootstrap yüklenirken bir hata oluştu:', error);
      });
  }

  return <Component {...pageProps} />;
}

export default MyApp;
