export default function NewsCard({ articles }) {
  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <a
          key={index}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-blue-600 hover:text-blue-800"
        >
          <p className="text-lg font-medium">{article.title}</p>
        </a>
      ))}
    </div>
  );
}