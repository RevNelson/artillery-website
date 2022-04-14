type FilterPropsType = {
  filters: any
  setFilters: any
}

export const Filter = ({ filters, setFilters }: FilterPropsType) => {
  return (
    <>
      <div className="pet-filter-container">
        <form>
          <div className="filter-container">
            <label htmlFor="favorite">Favorite</label>
            <select
              name="favorite"
              id="favorite"
              className="form-select"
              onChange={e =>
                setFilters({ ...filters, favored: e.target.value })
              }
            >
              <option value="any">Any</option>
              <option value="favorite">Favorite</option>
              <option value="not favorite">Not Favorite</option>
            </select>
          </div>
          <div className="filter-container">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              className="form-select"
              onChange={e => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </form>
      </div>
    </>
  )
}
