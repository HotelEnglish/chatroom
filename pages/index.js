import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      {/* 为了防止内容被 header 和 footer 遮挡，添加 padding */}
      <main className="pt-16 pb-16">
        {/* 原有的聊天界面内容 */}
      </main>
      <Footer />
    </div>
  );
} 