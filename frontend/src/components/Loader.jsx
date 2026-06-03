const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizes[size]} border-primary-500 border-t-transparent`} />
    </div>
  );
};

export default Loader;
