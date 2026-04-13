export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="category-filter">
            {/* Botão "Todas" para limpar o filtro */}
            <button
                className={activeCategory ? '' : 'active'}
                onClick={() => onCategoryChange(null)}
            >
                Todas
            </button>

            {categories.map(cat => (
                <button
                    key={cat.slug}
                    className={activeCategory === cat.slug ? 'active' : ''}
                    onClick={() => onCategoryChange(cat.slug)}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    )
};
