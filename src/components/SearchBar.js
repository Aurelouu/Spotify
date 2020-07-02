import React from 'react'

function SearchBar(props) {
    return (
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <form method="GET" id="search-bar">
                    <input class="form-control" type="text" placeholder="Search" name="result" />
                    <input class="btn btn-outline-success" type="submit" value="Search" />
                </form>
            </div>
        </div>
    )
}

export default SearchBar