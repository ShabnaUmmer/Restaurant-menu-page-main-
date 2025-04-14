import './index.css'

const MenuTabs = ({categories, activeTab, setActiveTab}) => (
  <div className="menu-tab-container">
    {categories.map((category, index) => (
      <button
        key={category.menu_category_id}
        className={`tab ${activeTab === index ? 'active' : ''}`}
        onClick={() => setActiveTab(index)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)
export default MenuTabs
