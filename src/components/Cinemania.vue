<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cinema Booking Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
     <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            min-height: 100vh;
            background-color: black;
        }

        .dashboard {
            display: flex;
            flex: 1;
        }

        .menu-btn {
            display: none;
            width: 40px;
            height: 40px;
            position: fixed;
            top: 20px;
            left: 20px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 101;
        }
        
        .menu-btn .bar {
            display: block;
            width: 100%;
            height: 4px;
            background: white;
            margin: 6px 0;
            transition: all 0.3s ease;
        }
        
        .sidebar {
            overflow-y: auto;
            background: rgba(18, 18, 18, 0.4);
            backdrop-filter: blur(5px);
            color: #FFFFFF;
            padding: 15px;
            border-right: 1px solid #1E1E1E; 
            position: fixed;
            transition: transform 0.3s ease;
            z-index: 99;
            transform: translateX(-100%);
            height: 100vh;
            width: 20%; /* Fixed width for desktop */
        }		
		
        .sidebar.active {
            transform: translateX(0);
        }
		
		.sidebar img{
			display: flex; /* Added for flexbox */
			flex-direction: column; /* Stack items vertically */
			align-items: center; /* Center items horizontally */
			justify-content: flex-start; /* Align items to the top */
		}
        .sidebar p{
			text-align: center;
			margin-bottom: 1vw;
        }
		.sidebar h2{
		text-align: center;
		font-size: 30px;
		margin-right: 0;
        }

        .sidebar ul {
            list-style: none;
        }

        .sidebar ul li {
            margin: 15px 0;
        }

        .sidebar ul li a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 10px;
            border-radius: 7px;
            background-color: #4f4f4f;
        }

        .sidebar ul li a:hover {
            color: #2f2f2f;
            background-color: #aeaeae;
        }
		
		.profile-logo {
			width: 10vw; /* Use a percentage of the viewport width */
			height: 10vw; /* Set height equal to width to keep it circular */
			border-radius: 50%; /* Make it circular */
			overflow: hidden; /* Ensures the image stays within the circle */
			margin-bottom: 20px; /* Space below the logo */
			margin-top: 50px;
			margin-left: 20%;			/* Adjust as needed for layout */
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
			border: 5px outset;
		}
		
		.profile-top {
			 background-color: #444444; /* Background color for the container */
    padding: 15px; /* Padding for spacing */
    border-radius: 10px; /* Rounded corners */
    margin-bottom: 20px; /* Space below the welcome container */
    text-align: left; /* Align the text to the left */
    color: #ffffff; /* Text color */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); /* Subtle white shadow */
    width: 100%; /* Make the container full width */
}

.profile-content .profile-top h2 {
    color: white;
    font-size: 24px;
    text-align: left;
    font-weight: 500;
    margin: 0;
}
		.profile-logo img {
			width: 100%; /* Makes the image responsive */
			height: auto; /* Maintains aspect ratio */
			display: block; /* Removes bottom whitespace */
}

.points-meter {
			margin-top: 20px;
			text-align: center;
			color: white;
		}

		.meter {
			background-color: #555;
			height: 20px;
			width: 60%;
			margin: 20px auto;
			position: relative;
			box-shadow: -0.5px -10px 10px rgba(255, 255, 100, 0.3);
			border: 1.5px solid white;
		}

		.meter-fill {
			background-color: #f39c12;
			height: 100%;
			position: relative;
		}

		.points-icon {
			position: absolute;
			right: -8px; 
			top: 50%;
			transform: translateY(-50%);
			width: 50px;
			transition: transform 0.3s ease, filter 0.3s ease;
		}

		.points-icon.glow {
			transform: translateY(-50%) scale(1.1);
			filter: drop-shadow(0 0 15px rgba(255, 223, 0, 0.8));
		}
/*-----------------SEARHCBAR----------------------------------*/
        .searchBar input {
            padding: 10px;
            width: 20%;
            border: 2px solid #4f4f4f;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        .searchBar input:focus {
            outline: none;
            border-color: #aeaeae;
        }
		
		/* Media Queries */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                width: 50%;
                height: 100%;
                position: fixed;
            }

            .sidebar.active {
                transform: translateX(0);
            }
			
			
			.profile-logo {
			width: 30vw; /* Use a percentage of the viewport width */
			height: 30vw; /* Set height equal to width to keep it circular */
			}

            .content {
                margin-left: 0;
                padding-top: 60px; 
                height: calc(100vh - 60px);
                width: 100%; /* Ensured full width on mobile */
                overflow-y: auto; /* Allow scrolling if content exceeds viewport */
            }

            .menu-btn {
                display: block;
            }
        }
        
        @media (min-width: 769px) {
            .menu-btn {
                display: block; /* Show menu button on desktop as well */
            }
        }

        @media (max-width: 480px) {
            .searchBar input {
                width: 100%;
            }

            .clock {
                font-size: 16px;
                top: 10px;
                right: 10px;
            }

            .movie-card {
                flex: 1 1 140px; /* Adjusted for smaller screens */
                max-width: 140px; /* Preventing it from getting too large */
            }
        }

        .clock {
            position: fixed;
            top: 15px;
            right: 15px;
            font-size: 18px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
        }

        .content {
		background-color: black;
		flex: 1;
		padding-top: 4em;
		padding-left: 5em;
		padding-right: 6em;/* Removed padding */
		color: white;
		overflow-y: auto; /* Allow scrolling if content exceeds viewport */
		height: 100vh; /* Full height of the viewport */
		z-index: 0;
        }
		
		.content h2{
		margin-top: 40px;
		text-align: center;
		}
		
	.home-content{
		margin-top: 13em;
		text-align: center;
		background-color; black;
		}
		
	.home-content p{
		margin-bottom: 10px;
	}
		
	#home-button {
		background-color: #f39c12; /* Button color */
		color: white; /* Text color */
		border: none;
		border-radius: 5px;
		margin-top: 55px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;
		z-index: 999;
	}
	
	#home-button:hover {
		background-color: #e67e22; /* Darker shade on hover */
	}
        
        .shows-movie {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
		

        .movie-card {
			margin-top: 20px;
            background-color: rgba(128, 128, 128, 0.2);
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.2);
            flex: 1 1 180px; /* Ensuring it flexes */
            max-width: 180px; /* Preventing it from getting too large */
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
		
		.movie-card:hover {
			transform: scale(1.1); /* Scale up on hover */
			box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.2);
			z-index: 1;
	 }
	 
		.movie-card p:nth-child(even){
			margin-bottom: 15px;
		}
		
		
        .movie-card img {
            width: 100%;
            height: auto;
			border-radius: 10px;
        }

        footer {
            text-align: center;
            padding: 10px;
            background-color: #750007;
            color: white;
            position: relative;
            bottom: 0;
            width: 100%;
        }


        /* Fullscreen Purchase Content */
        .purchase-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            color: #fff;
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100vw; 
            height: 100vh; 
            overflow: hidden; 
            padding: 0; 
        }

        .purchase-content video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; 
            opacity: 0.2; 
            overflow: hidden;
			z-index: -1;
        }
		
		.purchase-info {
			position: relative;
			z-index: 1; /* Ensure the info is above the video */
			text-align: center;
			color: #fff; /* Text color */
		}
		
		@media (max-width: 768px) {
    .purchase-content {
        padding: 20px; /* Add padding for mobile */
    }

    .movie-details {
        width: 100%; /* Full width on mobile */
    }

    .screen, .seating-chart {
        width: 100%; /* Full width on mobile */
    }
}

#purchase-button {
    background-color: #f39c12; /* Button color */
    color: white; /* Text color */
    border: none;
    border-radius: 5px;
	margin-top: 55px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
	z-index: 9999;
}

	#purchase-button:hover {
		background-color: #e67e22; /* Darker shade on hover */
}

    .movie-details {
		display: flex;
        align-items: center;
        justify-content: center;
        width: 100%; 
        max-width: 600px; 
        text-align: left; 
        position: relative; 
        z-index: 1; 
        padding: 20px; 
        }

        .movie-details img {
            width: 150px;
            height: auto;
            border-radius: 5px;
            margin-right: 20px; 
        }

        .screen {
            width: 100%;
            max-width: 500px;
            height: 40px;
            background-color: #555;
            color: #fff;
            text-align: center;
            font-weight: bold;
            line-height: 40px;
            border-radius: 5px;
            margin-bottom: 20px;
            z-index: 1; 
        }

        .seating-chart {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 5px;
            width: 100%;
            max-width: 500px;
            perspective: 800px;
            z-index: 1; 
        }

        .seat {
            padding-top: 100%;
            position: relative;
            background-color: #777;
            transform: rotateX(20deg);
            transition: background-color 0.3s, transform 0.2s;
            width: 100%; 
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px; 
            color: white;
            background-color: #4CAF50;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .seat.selected {
            background-color: #fdd835;
        }

        .seat.booked {
            background-color: #d32f2f; 
            cursor: not-allowed;
        }

        .seat:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body>

 <div id="app" class="dashboard">
        <button class="menu-btn" @click="toggleSidebar">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </button>
		
		
        <!-- Sidebar Navigation -->
        <div class="sidebar" :class="{ active: sidebarActive }">
    <div class="profile-logo" @click="setView('Profile')">
        <img src="./profile/profile1.jpeg" alt="Profile Logo" /> <!-- Replace with your logo  -->
    </div> 
	
	<!---------------------------   USERNAME    ----------------------------------------------->
	<p>Jose Marie Chan</p>
	<h2>CINEMANIA</h2>
            <ul>
				<li><a href="#" @click="setView('Profile')">Profile</a></li>
				<li><a href="#" @click="setView('Shows')">Now Showing</a></li>
				<li><a href="#Home" @click="setView('Home')">Home</a></li>
                <li><a href="#" @click="setView('Reciept')">Reciept</a></li>
                <li><a href="#" @click="setView('Feedback')">Feedback</a></li>
            </ul>
        </div>

<!---------------------------------------------------- Clock Display --------------------------->
        <div class="clock">{{ currentTime }}</div>



        <div class="content">
<!---------------------------------HOME-------------------------------------------->
            <div v-if="view === 'Home'" class="home-content" id="Home">
                <h1>Welcome, Jose Marie Chan!</h1>
                <p>Your one-stop solution for booking movies online.</p>
				<button id="home-button" @click="setView('Shows')">NOW SHOWING</button>
            </div>

<!------------------------------------------------------------------------------------->

<!---------------------------------------------------------- PROFILE ------------------>
<div v-if="view === 'Profile'" class="profile-content">
    <div class="profile-top">
        <h2>Welcome, User!</h2> <!-- Customize the greeting here -->
		<div class="points-meter">
            <div class="meter">
                <div class="meter-fill" :style="{ width: pointsPercentage + '%' }"></div>
				<img :src="iconPath" class="points-icon" :class="{ glow: points >= 100 }" />
            </div>
            <p>{{ points }} / {{ maxPoints }} points</p>
            <p v-if="points >= maxPoints">🎉 CLICK THE TICKET TO CLAIM THE REWARD! 🎉</p>
        </div>
    </div>
    <h1>User Profile</h1>
    <p>This section can include user information, settings, etc.</p>
</div>




<!--------------------------------NOW SHOWING-------------------------------------->
            <div v-if="view === 'Shows'" class="shows-content">
                <h1>Current Shows</h1>
                <div class="searchBar" v-if="showSearchBar">
                    <input type="text" placeholder="Search by title or genre..." v-model="searchQuery" @input="handleSearch" />
                </div>

                <div v-if="filteredMoviesList.length > 0" class="shows-movie">
                    <div class="movie-card" v-for="movie in filteredMoviesList" :key="movie.id" @click="setView('Purchase', movie)">
                        <img :src="movie.image" alt="Movie Poster" />
                        <h3>{{ movie.title }}</h3>
						<p>{{movie.genre}}</p>
                        <p>{{ movie.time }}</p>
                    </div>
                </div>

                <div v-if="!isSearching">
                    <!-- Action Movies -->
                    <h2>Action Movies</h2>
                    <div class="shows-movie">
                        <div class="movie-card" v-for="movie in filteredMovies('Action')" :key="movie.id" @click="setView('Purchase', movie)">
                            <img :src="movie.image" alt="Movie Poster" />
                            <h3>{{ movie.title }}, {{ movie.date }}</h3>
							<p>{{movie.genre}}</p>
                            <p>{{ movie.time }}, {{ movie.date }}</p>	
                        </div>
                    </div>

                    <!-- Drama Movies -->
                    <h2>Drama Movies</h2>
                    <div class="shows-movie">
                        <div class="movie-card" v-for="movie in filteredMovies('Drama')" :key="movie.id" @click="setView('Purchase', movie)">
                            <img :src="movie.image" alt="Movie Poster" />
                            <h3>{{ movie.title }}</h3>
							<p>{{movie.genre}}</p>
                            <p>{{ movie.time }}, </p>
							<p>{{ movie.time }}, {{ movie.date }}</p>
                        </div>
                    </div>
                </div>
            </div>
			
<!-----------------------------------------------------PURCHASE------------------------>
<div v-if="view === 'Purchase' && selectedMovie" class="purchase-content">
	<video autoplay muted loop>
	<source :src="selectedMovie.trailer" type="video/mp4">
    </video>
		<div class="movie-details">
            <img :src="selectedMovie.image" alt="Movie Poster" />
				<div class="purchase-details">
					<h2>{{ selectedMovie.title }}</h2>
                    <p><strong>Showtime:</strong>{{ selectedMovie.date }}, {{ selectedMovie.time }}</p>
                    <p><strong>Description:</strong> {{ selectedMovie.description }}</p>
					<button id="purchase-button" @click="purchaseTickets">Purchase Ticket</button>
                </div>
		</div>
    <div class="screen">Screen</div>
        <div class="seating-chart">
            <div 
            v-for="(seat, index) in getSeats(selectedMovie.id)" :key="index" :class="['seat', seat.status]" @click="toggleSeatSelection(selectedMovie.id, seat)">
				{{ seat.label }}
            </div>
        </div>
			<p>Selected Seats: {{ selectedSeats.join(', ') || 'None' }}</p>
</div>
<!---------------------------------------------------------------------------------------->
<!--------------------------------------------------FEEDBACK------------------------------>
<div v-if="view === 'Feedback'" class="feedback-content">
	<h2>Feedback</h2>
    <form>
		<label for="feedback">Your Feedback:</label>
        <input type="text" id="feedback" />
        <button type="submit">Submit</button>
    </form>
</div>
</div>
</div>

    <script>
	export default{
		name: 'Cinemania',
	}
	
    new Vue({
        el: '#app',
        data: {
            view: 'Home',
            sidebarActive: false,
            searchQuery: '',
            isSearching: false,
            currentTime: '',
            selectedMovie: null,
            selectedSeats: [],
            seats: [],
			filteredMoviesList: [],
			points: 100, // Sample points data
			maxPoints: 100,
			iconPath: './images/ticket.png',
			/*SAMPLE MOVIES*/
			movies: {
            Action: [
                { id: 1, title: 'Avengers: Endgame', genre: 'Action', date: 'December 13', time: '3:00 PM', image: './images/venom.jpg', description: 'A dark and thrilling tale of class disparity and family ties.', trailer: './assets/garfield2.mp4'},
                { id: 2, title: 'Inception', genre: 'Action', date: 'December 13', time: '7:00 PM', image: 'inception.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 3, title: 'The Dark Knight', genre: 'Action',date: 'December 13', time: '12:00 PM', image: 'darkknight.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 4, title: 'Guardians of the Galaxy', genre: 'Action', date: 'December 13', time: '8:30 PM', image: 'guardians.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 5, title: 'Uprising', genre: 'Action', time: '8:30 PM', image: 'uprising.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' }
            ],
            Drama: [
                { id: 6, title: 'The Shawshank Redemption', genre: 'Drama', date: 'December 13', time: '5:00 PM', image: 'shawshank.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 7, title: 'The Pursuit of Happyness', genre: 'Drama', date: 'December 13', time: '9:00 PM', image: 'pursuit.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 8, title: 'Titanic', genre: 'Drama', date: 'December 13', time: '11:00 AM', image: 'titanic.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 9, title: 'Forrest Gump', genre: 'Drama', date: 'December 13', time: '1:00 PM', image: 'forrest.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 10, title: 'Parasite', genre: 'Drama', date: 'December 13', time: '10:30 PM', image: 'parasite.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' }
            ],
            Horror: [
                { id: 11, title: 'Deadpool', genre: 'Horror', date: 'December 13', time: '2:30 PM', image: 'deadpool.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 12, title: 'The Hangover', genre: 'Horror', date: 'December 13', time: '4:30 PM', image: 'hangover.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' },
                { id: 13, title: 'Superbad', genre: 'Horror', date: 'December 13', time: '6:30 PM', image: 'superbad.jpg', description: 'A dark and thrilling tale of class disparity and family ties.' }
            ]
        },
		/*SAMPLE SEAT DATABASE*/
		seatDatabase: {
                1: {
                    rows: ['A', 'B', 'C', 'D', 'E'],
                    seats: [
                        { label: 'A1', status: 'available' },
                        { label: 'A2', status: 'available' },
                        { label: 'A3', status: 'available' },
						{ label: 'A4', status: 'available' },
                        { label: 'A5', status: 'available' },
                        { label: 'A6', status: 'available' },
						{ label: 'A7', status: 'available' },
                        { label: 'A8', status: 'available' },
                        { label: 'A9', status: 'available' },
						{ label: 'A10', status: 'available' },
						]
            }
        }
	},
        computed: {
            showSearchBar() {
                return this.view === 'Shows';
            },
			
			 pointsPercentage() {
            return (this.points / this.maxPoints) * 100;
			}
        },
        methods: {
			toggleSidebar() {
			this.sidebarActive = !this.sidebarActive;
            },
            setView(viewName, movie = null) {
			this.view = viewName;
			if (viewName === 'Purchase' && movie) {
			this.selectedMovie = movie;
			this.selectedSeats = []; // Reset selected seats
			this.sidebarActive = false;
    }
},	

		hideSidebar(event) {
            if (this.sidebarActive && !this.$el.querySelector('.sidebar').contains(event.target) && 
                !this.$el.querySelector('.menu-btn').contains(event.target)) {
                this.sidebarActive = false;
            }
        },
		
		handleSearch() {
        if (this.searchQuery.trim()) {
            this.isSearching = true;
            const query = this.searchQuery.toLowerCase();

            this.filteredMoviesList = Object.values(this.movies).flat().filter(movie =>
                movie.title.toLowerCase().includes(query) ||
                movie.genre.toLowerCase().includes(query)
            );
        } else {
            this.isSearching = false;
            this.filteredMoviesList = [];
        }
    },
			
            filteredMovies(genre) {
                return this.movies[genre].filter(movie =>
                    movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            },
			
			/*BOOKED SEATS*/
             getSeats(movieId) {
                return this.seatDatabase[movieId]?.seats || [];
            },
            toggleSeatSelection(movieId, seat) {
                if (seat.status === 'booked') return;

                seat.status = seat.status === 'selected' ? 'available' : 'selected';
                this.selectedSeats = this.getSeats(movieId)
                    .filter(seat => seat.status === 'selected')
                    .map(seat => seat.label);
            },
			
			
			/*PURCHASE TICKET*/
			 purchaseTickets() {
                if (this.selectedSeats.length > 0) {
                    // Logic to handle ticket purchase, like updating the seat status
                    this.selectedSeats.forEach(seatLabel => {
                        const seat = this.getSeats(this.selectedMovie.id).find(s => s.label === seatLabel);
                        if (seat) {
                            seat.status = 'booked'; // <---------------- Sample booked seat
                        }
                    });
                    alert(`Tickets purchased for ${this.selectedSeats.join(', ')}!`);
                    this.selectedSeats = []; // Reset selected seats
                    this.setView('Shows'); // Go back to shows after purchase
                } else {
                    alert('Please select at least one seat to purchase.');
                }
            },
			

			/*CLOCK*/
            updateClock() {
                const date = new Date();
                const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
                const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };

                const formattedTime = date.toLocaleTimeString([], timeOptions).replace(' ', '');
                const formattedDate = date.toLocaleDateString([], dateOptions);
                
                this.currentTime = `${formattedTime}, ${formattedDate}`;
            }
        },
        mounted() {
            this.updateClock();
            setInterval(this.updateClock, 1000); // Update every second
			document.addEventListener('click', this.hideSidebar);
        },
		beforeDestroy() {
        document.removeEventListener('click', this.hideSidebar);
    }
    });
    </script>
</body>
</html>
