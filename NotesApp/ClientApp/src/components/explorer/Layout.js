import Footer from './Footer.js';
import ExplorerHeader from './ExplorerHeader.js';

function Layout(props) {
  const {children} = props;

  return (
      <div className="relative z-0">
        <ExplorerHeader/>
        <div className="m-3">
          {children}
        </div>
        <Footer/>
      </div>
  );
}

export default Layout;