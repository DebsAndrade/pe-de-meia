import PropTypes from 'prop-types';
import { Button } from './ui/button';

function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                variant={activeCategory ? "outline" : "default"}
                size="sm"
                onClick={() => onCategoryChange(null)}
            >
                Todas
            </Button>

            {categories.map(cat => (
                <Button
                    key={cat.slug}
                    variant={activeCategory === cat.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCategoryChange(cat.slug)}
                >
                    {cat.label}
                </Button>
            ))}
        </div>
    )
}

CategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeCategory: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
}

export default CategoryFilter;
