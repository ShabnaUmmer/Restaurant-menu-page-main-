import {useState, useEffect} from 'react'

import './App.css'

import Navbar from './components/Navbar'
import DishItem from './components/DishItem'
import MenuTabs from './components/MenuTabs'

//write your code here

const FetchMenuData = async () => {
  const apiLink =
    'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
  const response = await fetch(apiLink)
  if (response.ok) {
    const data = await response.json()
    return data[0]
  } else {
    console.log('error')
    return null
  }
}

const App = () => {
  const [restaurantData, setRestaurantData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [cart, setCart] = useState({})

  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const data = await FetchMenuData()
      if (data) {
        setRestaurantData(data)
      } else {
        setError('No Data Available')
      }
    }
    loadData()
  }, [])

  const updateCart = (dishId, quantity) => {
    if (quantity < 0) return
    setCart(prev => {
      const newCart = {...prev}
      if (quantity === 0) {
        delete newCart[dishId]
      } else {
        newCart[dishId] = quantity
      }
      return newCart
    })
  }

  if (!restaurantData)
    return <div className="error">No restaurant data available</div>

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const {restaurant_name, restaurant_image, table_menu_list} = restaurantData
  const activeCategory = table_menu_list[activeTab]

  return (
    <div className="app">
      <header>
        <Navbar count={totalItems} restaurant_name={restaurant_name} />
      </header>

      {restaurant_image && (
        <div className="restaurant-hero">
          <img
            src={restaurant_image}
            alt={restaurant_name}
            className="restaurant-image"
          />
        </div>
      )}

      <MenuTabs
        categories={table_menu_list}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="menu-content">
        <div className="dish-list">
          {activeCategory.category_dishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              quantity={cart[dish.dish_id] || 0}
              updateCart={updateCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
