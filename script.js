document.addEventListener('DOMContentLoaded', () => {
    const pages = [
        { title: "Home", url: "/" },
        { title: "Angle Converter", url: "/angle/" },
        { title: "Degrees To Mils Converter", url: "/angle/degrees-to-mils/" },
        { title: "Degrees To Radians Converter", url: "/angle/degrees-to-radians/" },
        { title: "Gradians To Degrees Converter", url: "/angle/gradians-to-degrees/" },
        { title: "Mils To Degrees Converter", url: "/angle/mils-to-degrees/" },
        { title: "Radians To Degrees Converter", url: "/angle/radians-to-degrees/" },
        { title: "Area Converter", url: "/area/" },
        { title: "Acres To Square Feet Converter", url: "/area/acres-to-square-feet/" },
        { title: "Hectares To Acres Converter", url: "/area/hectares-to-acres/" },
        { title: "Roods To Acres Converter", url: "/area/roods-to-acres/" },
        { title: "Square Chains To Square Feet Converter", url: "/area/square-chains-to-square-feet/" },
        { title: "Square Feet To Acres Converter", url: "/area/square-feet-to-acres/" },
        { title: "Square Furlongs To Acres Converter", url: "/area/square-furlongs-to-acres/" },
        { title: "Square Inches To Square Centimeters Converter", url: "/area/square-inches-to-square-centimeters/" },
        { title: "Square Kilometers To Square Miles Converter", url: "/area/square-kilometers-to-square-miles/" },
        { title: "Square Meters To Square Feet Converter", url: "/area/square-meters-to-square-feet/" },
        { title: "Square Yards To Square Meters Converter", url: "/area/square-yards-to-square-meters/" },
        { title: "Cooking Converter", url: "/cooking/" },
        { title: "Cups To Ounces Converter", url: "/cooking/cups-to-ounces/" },
        { title: "Dashes To Milliliters Converter", url: "/cooking/dashes-to-milliliters/" },
        { title: "Pinches To Grams Converter", url: "/cooking/pinches-to-grams/" },
        { title: "Teaspoons To Tablespoons Converter", url: "/cooking/teaspoons-to-tablespoons/" },
        { title: "Data Converter", url: "/data/" },
        { title: "Bits To Nibbles Converter", url: "/data/bits-to-nibbles/" },
        { title: "Bytes To Kilobytes Converter", url: "/data/bytes-to-kilobytes/" },
        { title: "Exabytes To Zettabytes Converter", url: "/data/exabytes-to-zettabytes/" },
        { title: "Megabytes To Gigabytes Converter", url: "/data/megabytes-to-gigabytes/" },
        { title: "Terabytes To Petabytes Converter", url: "/data/terabytes-to-petabytes/" },
        { title: "Energy Converter", url: "/energy/" },
        { title: "Btu To Joules Converter", url: "/energy/btu-to-joules/" },
        { title: "Electronvolts To Joules Converter", url: "/energy/electronvolts-to-joules/" },
        { title: "Ergs To Joules Converter", url: "/energy/ergs-to-joules/" },
        { title: "Foot Pounds To Newton Meters Converter", url: "/energy/foot-pounds-to-newton-meters/" },
        { title: "Joules To Calories Converter", url: "/energy/joules-to-calories/" },
        { title: "Kilowatt Hours To Joules Converter", url: "/energy/kilowatt-hours-to-joules/" },
        { title: "Force Converter", url: "/force/" },
        { title: "Dynes To Newtons Converter", url: "/force/dynes-to-newtons/" },
        { title: "Kilogram Force To Newtons Converter", url: "/force/kilogram-force-to-newtons/" },
        { title: "Newtons To Pounds Force Converter", url: "/force/newtons-to-pounds-force/" },
        { title: "Poundals To Newtons Converter", url: "/force/poundals-to-newtons/" },
        { title: "Fuel Efficiency Converter", url: "/fuel-efficiency/" },
        { title: "Kilometers Per Liter To Mpg Converter", url: "/fuel-efficiency/kilometers-per-liter-to-mpg/" },
        { title: "Mpg Imperial To Mpg Us Converter", url: "/fuel-efficiency/mpg-imperial-to-mpg-us/" },
        { title: "Mpg To Liters Per 100km Converter", url: "/fuel-efficiency/mpg-to-liters-per-100km/" },
        { title: "Length Converter", url: "/length/" },
        { title: "Angstroms To Nanometers Converter", url: "/length/angstroms-to-nanometers/" },
        { title: "Centimeters To Inches Converter", url: "/length/centimeters-to-inches/" },
        { title: "Cm To Feet Converter", url: "/length/cm-to-feet/" },
        { title: "Cm To Inches Converter", url: "/length/cm-to-inches/" },
        { title: "Cubits To Meters Converter", url: "/length/cubits-to-meters/" },
        { title: "Feet To Inches Converter", url: "/length/feet-to-inches/" },
        { title: "Furlongs To Chains Converter", url: "/length/furlongs-to-chains/" },
        { title: "Inches To Cm Converter", url: "/length/inches-to-cm/" },
        { title: "Inches To Feet Converter", url: "/length/inches-to-feet/" },
        { title: "Kilometers To Miles Converter", url: "/length/kilometers-to-miles/" },
        { title: "Km To Miles Converter", url: "/length/km-to-miles/" },
        { title: "Light Years To Parsecs Converter", url: "/length/light-years-to-parsecs/" },
        { title: "Meters To Feet Converter", url: "/length/meters-to-feet/" },
        { title: "Meters To Yards Converter", url: "/length/meters-to-yards/" },
        { title: "Micrometers To Nanometers Converter", url: "/length/micrometers-to-nanometers/" },
        { title: "Miles To Nautical Miles Converter", url: "/length/miles-to-nautical-miles/" },
        { title: "Millimeters To Inches Converter", url: "/length/millimeters-to-inches/" },
        { title: "Mm To Inches Converter", url: "/length/mm-to-inches/" },
        { title: "Rods To Feet Converter", url: "/length/rods-to-feet/" },
        { title: "Yards To Meters Converter", url: "/length/yards-to-meters/" },
        { title: "Let Us Know Converter", url: "/let-us-know/" },
        { title: "Mm To Sae Converter", url: "/other/mm-to-sae/" },
        { title: "Power Converter", url: "/power/" },
        { title: "Btu Per Hour To Watts Converter", url: "/power/btu-per-hour-to-watts/" },
        { title: "Cheval Vapeur To Horsepower Converter", url: "/power/cheval-vapeur-to-horsepower/" },
        { title: "Ergs Per Second To Watts Converter", url: "/power/ergs-per-second-to-watts/" },
        { title: "Horsepower To Kilowatts Converter", url: "/power/horsepower-to-kilowatts/" },
        { title: "Hp To Kw Converter", url: "/power/hp-to-kw/" },
        { title: "Kw To Hp Converter", url: "/power/kw-to-hp/" },
        { title: "Watts To Horsepower Converter", url: "/power/watts-to-horsepower/" },
        { title: "Pressure Converter", url: "/pressure/" },
        { title: "At To Bars Converter", url: "/pressure/at-to-bars/" },
        { title: "Bars To Psi Converter", url: "/pressure/bars-to-psi/" },
        { title: "Inches Of Mercury To Pascals Converter", url: "/pressure/inches-of-mercury-to-pascals/" },
        { title: "Pascals To Atmospheres Converter", url: "/pressure/pascals-to-atmospheres/" },
        { title: "Torr To Millibars Converter", url: "/pressure/torr-to-millibars/" },
        { title: "Specialized Converter", url: "/specialized/" },
        { title: "Astronomical Units To Kilometers Converter", url: "/specialized/astronomical-units-to-kilometers/" },
        { title: "Becquerels To Curies Converter", url: "/specialized/becquerels-to-curies/" },
        { title: "Candela To Lumens Converter", url: "/specialized/candela-to-lumens/" },
        { title: "Gauss To Teslas Converter", url: "/specialized/gauss-to-teslas/" },
        { title: "Knots To Fathoms Per Minute Converter", url: "/specialized/knots-to-fathoms-per-minute/" },
        { title: "Planck Length To Meters Converter", url: "/specialized/planck-length-to-meters/" },
        { title: "Poise To Pascal Seconds Converter", url: "/specialized/poise-to-pascal-seconds/" },
        { title: "Reyns To Pascal Seconds Converter", url: "/specialized/reyns-to-pascal-seconds/" },
        { title: "Sieverts To Rems Converter", url: "/specialized/sieverts-to-rems/" },
        { title: "Speed Converter", url: "/speed/" },
        { title: "Furlongs Per Fortnight To Meters Per Second Converter", url: "/speed/furlongs-per-fortnight-to-meters-per-second/" },
        { title: "Kilometers Per Hour To Miles Per Hour Converter", url: "/speed/kilometers-per-hour-to-miles-per-hour/" },
        { title: "Knots To Miles Per Hour Converter", url: "/speed/knots-to-miles-per-hour/" },
        { title: "Kph To Mph Converter", url: "/speed/kph-to-mph/" },
        { title: "Mach To Meters Per Second Converter", url: "/speed/mach-to-meters-per-second/" },
        { title: "Meters Per Second To Feet Per Second Converter", url: "/speed/meters-per-second-to-feet-per-second/" },
        { title: "Meters Per Second To Miles Per Hour Converter", url: "/speed/meters-per-second-to-miles-per-hour/" },
        { title: "Miles Per Hour To Kilometers Per Hour Converter", url: "/speed/miles-per-hour-to-kilometers-per-hour/" },
        { title: "Mph To Kph Converter", url: "/speed/mph-to-kph/" },
        { title: "Temperature Converter", url: "/temperature/" },
        { title: "Celsius To Fahrenheit Converter", url: "/temperature/celsius-to-fahrenheit/" },
        { title: "Celsius To Kelvin Converter", url: "/temperature/celsius-to-kelvin/" },
        { title: "Fahrenheit To Celsius Converter", url: "/temperature/fahrenheit-to-celsius/" },
        { title: "Kelvin To Rankine Converter", url: "/temperature/kelvin-to-rankine/" },
        { title: "Reaumur To Celsius Converter", url: "/temperature/reaumur-to-celsius/" },
        { title: "Time Converter", url: "/time/" },
        { title: "Days To Weeks Converter", url: "/time/days-to-weeks/" },
        { title: "Fortnights To Days Converter", url: "/time/fortnights-to-days/" },
        { title: "Hours To Days Converter", url: "/time/hours-to-days/" },
        { title: "Lustrums To Years Converter", url: "/time/lustrums-to-years/" },
        { title: "Microseconds To Nanoseconds Converter", url: "/time/microseconds-to-nanoseconds/" },
        { title: "Minutes To Hours Converter", url: "/time/minutes-to-hours/" },
        { title: "Seconds To Minutes Converter", url: "/time/seconds-to-minutes/" },
        { title: "Sidereal Days To Solar Days Converter", url: "/time/sidereal-days-to-solar-days/" },
        { title: "Years To Hours Converter", url: "/time/years-to-hours/" },
        { title: "Volume Converter", url: "/volume/" },
        { title: "Barrels To Gallons Converter", url: "/volume/barrels-to-gallons/" },
        { title: "Bushels To Liters Converter", url: "/volume/bushels-to-liters/" },
        { title: "Cubic Meters To Cubic Feet Converter", url: "/volume/cubic-meters-to-cubic-feet/" },
        { title: "Cubic Parsecs To Cubic Light Years Converter", url: "/volume/cubic-parsecs-to-cubic-light-years/" },
        { title: "Cups To Milliliters Converter", url: "/volume/cups-to-milliliters/" },
        { title: "Cups To Ml Converter", url: "/volume/cups-to-ml/" },
        { title: "Gallons To Liters Converter", url: "/volume/gallons-to-liters/" },
        { title: "Hogsheads To Gallons Converter", url: "/volume/hogsheads-to-gallons/" },
        { title: "Liters To Gallons Converter", url: "/volume/liters-to-gallons/" },
        { title: "Milliliters To Cups Converter", url: "/volume/milliliters-to-cups/" },
        { title: "Milliliters To Fluid Ounces Converter", url: "/volume/milliliters-to-fluid-ounces/" },
        { title: "Ml To Cups Converter", url: "/volume/ml-to-cups/" },
        { title: "Pints To Liters Converter", url: "/volume/pints-to-liters/" },
        { title: "Quarts To Gallons Converter", url: "/volume/quarts-to-gallons/" },
        { title: "Teaspoons To Drops Converter", url: "/volume/teaspoons-to-drops/" },
        { title: "Weight Converter", url: "/weight/" },
        { title: "Carats To Grams Converter", url: "/weight/carats-to-grams/" },
        { title: "Grains To Grams Converter", url: "/weight/grains-to-grams/" },
        { title: "Grams To Ounces Converter", url: "/weight/grams-to-ounces/" },
        { title: "Kg To Lbs Converter", url: "/weight/kg-to-lbs/" },
        { title: "Kilograms To Pounds Converter", url: "/weight/kilograms-to-pounds/" },
        { title: "Lbs To Kg Converter", url: "/weight/lbs-to-kg/" },
        { title: "Mg To Mcg Converter", url: "/weight/mg-to-mcg/" },
        { title: "Milligrams To Micrograms Converter", url: "/weight/milligrams-to-micrograms/" },
        { title: "Ounces To Grams Converter", url: "/weight/ounces-to-grams/" },
        { title: "Ounces To Pounds Converter", url: "/weight/ounces-to-pounds/" },
        { title: "Pounds To Kilograms Converter", url: "/weight/pounds-to-kilograms/" },
        { title: "Pounds To Ounces Converter", url: "/weight/pounds-to-ounces/" },
        { title: "Slugs To Kilograms Converter", url: "/weight/slugs-to-kilograms/" },
        { title: "Stone To Pounds Converter", url: "/weight/stone-to-pounds/" },
        { title: "Tons Metric To Tons Us Converter", url: "/weight/tons-metric-to-tons-us/" },
        { title: "Troy Ounces To Ounces Converter", url: "/weight/troy-ounces-to-ounces/" },
    ];
    

    // Existing navigation logic (ensure this calls loadContent with the page param)
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'home';
        loadContent(page);

        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = link.getAttribute('data-page');
                window.history.pushState({}, '', `index.html?page=${newPage}`);
                loadContent(newPage);
            });
        });
    });
    // Sidebar accordion behavior (consolidated)
    document.querySelectorAll('.category-link').forEach(link => {
        console.log('Found category link:', link.textContent); // Debug: Confirm links are found
        link.addEventListener('click', function(e) {
            const subcategoryList = this.nextElementSibling;
            console.log('Clicked:', this.textContent, 'Next sibling:', subcategoryList); // Debug: Check click and sibling

            if (subcategoryList && subcategoryList.classList.contains('subcategory-list')) {
                e.preventDefault(); // Prevent navigation if toggling dropdown
                console.log('Prevented navigation, toggling subcategory'); // Debug

                // Close all other subcategories
                document.querySelectorAll('.subcategory-list').forEach(list => {
                    if (list !== subcategoryList) {
                        list.classList.remove('active');
                    }
                });

                // Toggle the clicked subcategory
                subcategoryList.classList.toggle('active');
                console.log('Subcategory active state:', subcategoryList.classList.contains('active')); // Debug: Check toggle result
            }
        });
    });
    function loadContent(page) {
        const contentDiv = document.getElementById('content');
        const url = contentMap[page] || contentMap['home'];
        const isBingbot = navigator.userAgent.includes('Bingbot');
        
        if (isBingbot) {
            contentDiv.innerHTML = '<h1>' + page.replace(/-/g, ' ') + '</h1><p>Convert ' + page + ' here.</p>'; // Static fallback
            updateMetaTags(page);
        } else {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    contentDiv.innerHTML = data;
                    updateMetaTags(page);
                });
        }
    }
    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchIcon && searchContainer && searchInput && searchResults) {
        searchIcon.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        });

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            searchResults.innerHTML = '';

            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const matches = pages.filter(page => 
                page.title.toLowerCase().includes(query)
            ).slice(0, 10);

            if (matches.length > 0) {
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${match.url}">${match.title}</a>`;
                    li.addEventListener('click', () => {
                        window.location.href = match.url;
                    });
                    searchResults.appendChild(li);
                });
                searchResults.classList.add('active');
            } else {
                searchResults.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
                searchContainer.classList.remove('active');
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        });
    }
});