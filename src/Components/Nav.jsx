import React from 'react';
import { Link } from 'react-router-dom';


function Nav(props) {
    return (
        <div>
            <nav>
                <Link to='/ben'>
					<p>Ben</p>
				</Link>
                <Link to='/brandon'>
					<p>Brandon</p>
				</Link>
                <Link to='/gary'>
					<p>Gary</p>
				</Link>
                <Link to='/syeda'>
					<p>Syeda</p>
				</Link>
            </nav>
        </div>
    );
}

export default Nav;