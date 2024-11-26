import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ClubHomePage = () => {
    const { CID } = useParams();

    return (
        <div>
            <header>
                <h1>Welcome to Club Hub</h1>
            </header>
            <main>
                <section>
                    <h2>About Our Club</h2>
                    <p>We are a community of enthusiasts who share a common interest in various activities and hobbies.</p>
                </section>
                <section>
                    <h2>Club Threads</h2>
                    <h2>Club ChatRooms</h2>
                    <Outlet />
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Club Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ClubHomePage;