import React from 'react';

function Header() {
    return (
        <div class="row">
            <div class="col-12">
                <header>
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/list-albums">Albums</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/list-genres">Genres</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/list-artists">Artists</a>
                        </li>
                    </ul>
                </header>
            </div>
        </div>
    )
}

export default Header