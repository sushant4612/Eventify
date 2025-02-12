const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="text-red-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
);

export default FeatureCard; 