import "./Product.css";

const Search = () => {
  return (
    <>
      <div className="form-container" ref={searchDiv}>
        <div className="input-cont">
          <input
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearch}
            type="text"
          />
        </div>

        {searchTerm.length > 0 && <></>}
      </div>
    </>
  );
};
export default Search;
