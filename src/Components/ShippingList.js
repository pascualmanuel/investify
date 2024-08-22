const ShoppingList = () => {
  const [items, setItems] = useState([]);




  return (
    <div>
      <h3>Lista de Compras</h3>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Artículo"
      />
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Costo"
      />
      <button onClick={addItem}>Agregar</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}: ${item.cost.toFixed(2)}
          </li>
        ))}
      </ul>
      <h4>Total: ${totalCost.toFixed(2)}</h4>
    </div>
  );
};

export default ShoppingList;
