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
    </div>
  );
};

export default ShoppingList;
