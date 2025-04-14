import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CustomizationModal from '../CustomizationModal'
import './index.css'

const DishItem = ({dish, updateCart, quantity}) => {
  const [previousCustomizations, setPreviousCustomizations] = useState(null)
  const [showCustomization, setShowCustomization] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleAddToCart = () => {
    if (dish.addonCat?.length > 0) {
      if (quantity === 0) {
        setShowCustomization(true)
      } else {
        setShowConfirm(true)
      }
    } else {
      updateCart(dish.dish_id, quantity + 1)
    }
  }

  const handleSaveCustomizations = customizations => {
    setPreviousCustomizations(customizations)
    updateCart(dish.dish_id, quantity + 1, customizations)
    setShowCustomization(false)
  }

  const calculateTotalPrice = selectedAddons => {
    let total = parseFloat(dish.dish_price)
    if (selectedAddons) {
      Object.values(selectedAddons).forEach(addonId => {
        if (addonId) {
          dish.addonCat.forEach(category => {
            const addon = category.addons.find(a => a.dish_id === addonId)
            if (addon) {
              total += parseFloat(addon.dish_price)
            }
          })
        }
      })
    }
    return total
  }
  return (
    <div className="item-container">
      <div className="v-nv">
        {dish.dish_Type && (
          <span
            className={`dish-type ${dish.dish_Type === 2 ? 'veg' : 'non-veg'}`}
          >
            {dish.dish_Type === 2 ? '🟢' : '🔴'}
          </span>
        )}
        <div className="dish-content">
          <div className="dish-info">
            <h1 className="dish-name">{dish.dish_name}</h1>
            <h3 className="dish-price">
              {dish.dish_currency} {dish.dish_price}
            </h3>
            <p className="dish-description">{dish.dish_description}</p>
            {!dish.dish_Availability && (
              <p className="unavailable-text">Not available</p>
            )}
          </div>
          {dish.dish_Availability && (
            <div className="dish-controls">
              <div className="quantity-controls">
                <button onClick={() => updateCart(dish.dish_id, quantity - 1)}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleAddToCart()}>+</button>
              </div>
              {dish.addonCat?.length > 0 && (
                <p className="customization">Customizations available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="dish-cal-img">
        {dish.dish_calories > 0 && (
          <h4 className="dish-calories">{dish.dish_calories} calories</h4>
        )}
        {dish.dish_image && (
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="dish-image"
          />
        )}
      </div>
      {showCustomization && (
        <Popup
          className="confirm-popup"
          contentStyle={{
            width: '100%',
            maxWidth: '700px',
            height: '100vh',
            maxHeight: '60vh',
            borderRadius: '20px',
            padding: '0',
            border: 'none',
            overflow: 'auto',
            scrollbarWidth: 'none',
          }}
          open={showCustomization}
          onClose={() => setShowCustomization(false)}
          modal
          nested
        >
          <CustomizationModal
            dish={dish}
            addonCategories={dish.addonCat}
            onClose={() => setShowCustomization(false)}
            onSave={handleSaveCustomizations}
            calculateTotalPrice={calculateTotalPrice}
          />
        </Popup>
      )}

      {showConfirm && (
        <Popup
          className="confirm-popup"
          contentStyle={{
            borderRadius: '20px',
            padding: '0',
            border: 'none',
          }}
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          modal
          nested
        >
          <div className="confirm-modal">
            <p>Use same customizations as last time?</p>
            <div className="confirm-buttons">
              <button
                className="confirm-btn"
                type="button"
                onClick={() => {
                  updateCart(dish.dish_id, quantity + 1, previousCustomizations)
                  setShowConfirm(false)
                }}
              >
                Use Same
              </button>
              <button
                className="confirm-btn"
                type="button"
                onClick={() => {
                  setShowConfirm(false)
                  setShowCustomization(true)
                }}
              >
                Choose New
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  )
}

export default DishItem
