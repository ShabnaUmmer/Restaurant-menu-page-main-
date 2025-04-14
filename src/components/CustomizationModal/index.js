import {useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import './index.css'

const CustomizationModal = ({
  dish,
  addonCategories,
  onClose,
  onSave,
  calculateTotalPrice,
}) => {
  const [selectedAddons, setSelectedAddons] = useState({})

  const handleAddonChange = (categoryId, addonId, isSelected) => {
    setSelectedAddons(prev => ({
      ...prev,
      [categoryId]: isSelected ? addonId : null,
    }))
  }

  const totalPrice = calculateTotalPrice(selectedAddons)

  return (
    <div className="modal-popup">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-head">
            <h3>
              {dish.dish_name} - {dish.dish_currency} {dish.dish_price}
            </h3>
            <span>Customize as per your taste</span>
          </div>
          <button onClick={onClose} className="close-btn">
            <AiOutlineClose />
          </button>
        </div>
        <hr />
        <div className="addon-categories">
          {addonCategories.map(category => (
            <div key={category.addon_category_id} className="addon-category">
              <h4>{category.addon_category}</h4>
              <div className="addon-options">
                {category.addons.map(addon => (
                  <label key={addon.dish_id} className="addon-option">
                    <div>
                      <input
                        type="radio"
                        name={`addon-${category.addon_category_id}`}
                        checked={
                          selectedAddons[category.addon_category_id] ===
                          addon.dish_id
                        }
                        onChange={e =>
                          handleAddonChange(
                            category.addon_category_id,
                            addon.dish_id,
                            e.target.checked,
                          )
                        }
                      />
                      <span className="addon-name">{addon.dish_name}</span>
                    </div>
                    <span className="addon-price">
                      +{addon.dish_currency} {addon.dish_price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <h4>
            Total: {dish.dish_currency} {totalPrice}
          </h4>
          <div className="buttons">
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button onClick={() => onSave(selectedAddons)} className="save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizationModal
