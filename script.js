document.addEventListener('DOMContentLoaded', () => {
    // Get the content container
    const contentContainer = document.getElementById('content-container');

    // Get the page parameter from the URL (e.g., ?page=mph-to-kph)
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'home'; // Default page if no param
    console.log('Page parameter:', page); // Debug: Check the page value

    // Map page names to content file paths
    const contentMap = {
        // Home (not nested)
        'home': 'content/home.html',
        'let-us-know': 'content/let-us-know.html',
    
        // Length/Distance (from sidebar)
        'length': 'content/length/length.html', // Category page
        'meters-to-feet': 'content/length/meters-to-feet.html',
        'kilometers-to-miles': 'content/length/kilometers-to-miles.html',
        'centimeters-to-inches': 'content/length/centimeters-to-inches.html',
        'millimeters-to-inches': 'content/length/millimeters-to-inches.html',
        'yards-to-meters': 'content/length/yards-to-meters.html',
        'feet-to-inches': 'content/length/feet-to-inches.html',
        'miles-to-nautical-miles': 'content/length/miles-to-nautical-miles.html',
        'micrometers-to-nanometers': 'content/length/micrometers-to-nanometers.html',
        'angstroms-to-nanometers': 'content/length/angstroms-to-nanometers.html',
        'furlongs-to-chains': 'content/length/furlongs-to-chains.html',
        'light-years-to-parsecs': 'content/length/light-years-to-parsecs.html',
        'cubits-to-meters': 'content/length/cubits-to-meters.html',
        'rods-to-feet': 'content/length/rods-to-feet.html',
        // From Common Conversions (Length)
        'inches-to-cm': 'content/length/inches-to-cm.html',
        'cm-to-inches': 'content/length/cm-to-inches.html',
        'km-to-miles': 'content/length/km-to-miles.html', // Alias for kilometers-to-miles
        'cm-to-feet': 'content/length/cm-to-feet.html',
        'mm-to-inches': 'content/length/mm-to-inches.html', // Already in sidebar
        'meters-to-yards': 'content/length/meters-to-yards.html', // Already in sidebar        
        'inches-to-feet': 'content/length/inches-to-feet.html', // Already in sidebar
    
        // Weight/Mass (from sidebar)
        'weight': 'content/weight/weight.html', // Category page
        'kilograms-to-pounds': 'content/weight/kilograms-to-pounds.html',
        'pounds-to-ounces': 'content/weight/pounds-to-ounces.html',
        'grams-to-ounces': 'content/weight/grams-to-ounces.html',
        'ounces-to-grams': 'content/weight/ounces-to-grams.html',
        'pounds-to-kilograms': 'content/weight/pounds-to-kilograms.html',
        'tons-metric-to-tons-us': 'content/weight/tons-metric-to-tons-us.html',
        'milligrams-to-micrograms': 'content/weight/milligrams-to-micrograms.html',
        'mg-to-mcg': 'content/weight/mg-to-mcg.html',
        'stone-to-pounds': 'content/weight/stone-to-pounds.html',
        'carats-to-grams': 'content/weight/carats-to-grams.html',
        'slugs-to-kilograms': 'content/weight/slugs-to-kilograms.html',
        'troy-ounces-to-ounces': 'content/weight/troy-ounces-to-ounces.html',
        'grains-to-grams': 'content/weight/grains-to-grams.html',
        // From Common Conversions (Weight)
        'ounces-to-pounds': 'content/weight/ounces-to-pounds.html',
        'kg-to-lbs': 'content/weight/kg-to-lbs.html', // Alias for kilograms-to-pounds
        'lbs-to-kg': 'content/weight/lbs-to-kg.html', // Alias for pounds-to-kilograms
        'ounces-to-grams': 'content/weight/ounces-to-grams.html', // Already in sidebar
        'pounds-to-ounces': 'content/weight/pounds-to-ounces.html', // Already in sidebar
        'grams-to-ounces': 'content/weight/grams-to-ounces.html', // Already in sidebar
        
    
        // Volume/Capacity (from sidebar)
        'volume': 'content/volume/volume.html', // Category page
        'liters-to-gallons': 'content/volume/liters-to-gallons.html',
        'gallons-to-liters': 'content/volume/gallons-to-liters.html',
        'milliliters-to-fluid-ounces': 'content/volume/milliliters-to-fluid-ounces.html',
        'cubic-meters-to-cubic-feet': 'content/volume/cubic-meters-to-cubic-feet.html',
        'cups-to-milliliters': 'content/volume/cups-to-milliliters.html',
        'pints-to-liters': 'content/volume/pints-to-liters.html',
        'quarts-to-gallons': 'content/volume/quarts-to-gallons.html',
        'barrels-to-gallons': 'content/volume/barrels-to-gallons.html',
        'bushels-to-liters': 'content/volume/bushels-to-liters.html',
        'teaspoons-to-drops': 'content/volume/teaspoons-to-drops.html',
        'hogsheads-to-gallons': 'content/volume/hogsheads-to-gallons.html',
        'cubic-parsecs-to-cubic-light-years': 'content/volume/cubic-parsecs-to-cubic-light-years.html',
        // From Common Conversions (Volume)
        'ml-to-cups': 'content/volume/ml-to-cups.html',
        'liters-to-gallons': 'content/volume/liters-to-gallons.html', // Already in sidebar
        'gallons-to-liters': 'content/volume/gallons-to-liters.html', // Already in sidebar        
        'cups-to-ml': 'content/volume/cups-to-ml.html', // Alias for cups-to-milliliters
    
        // Area (from sidebar)
        'area': 'content/area/area.html', // Category page
        'square-meters-to-square-feet': 'content/area/square-meters-to-square-feet.html',
        'acres-to-square-feet': 'content/area/acres-to-square-feet.html',
        'square-kilometers-to-square-miles': 'content/area/square-kilometers-to-square-miles.html',
        'hectares-to-acres': 'content/area/hectares-to-acres.html',
        'square-yards-to-square-meters': 'content/area/square-yards-to-square-meters.html',
        'square-inches-to-square-centimeters': 'content/area/square-inches-to-square-centimeters.html',
        'roods-to-acres': 'content/area/roods-to-acres.html',
        'square-chains-to-square-feet': 'content/area/square-chains-to-square-feet.html',
        'square-furlongs-to-acres': 'content/area/square-furlongs-to-acres.html',
        // From Common Conversions (Area)
        'square-feet-to-acres': 'content/area/square-feet-to-acres.html',
        'acres-to-square-feet': 'content/area/acres-to-square-feet.html', // Already in sidebar
        
    
        // Temperature (from sidebar)
        'temperature': 'content/temperature/temperature.html', // Category page
        'celsius-to-fahrenheit': 'content/temperature/celsius-to-fahrenheit.html',
        'fahrenheit-to-celsius': 'content/temperature/fahrenheit-to-celsius.html',
        'celsius-to-kelvin': 'content/temperature/celsius-to-kelvin.html',
        'kelvin-to-rankine': 'content/temperature/kelvin-to-rankine.html',
        'reaumur-to-celsius': 'content/temperature/reaumur-to-celsius.html',
        // From Common Conversions (Temperature)
        'celsius-to-fahrenheit': 'content/temperature/celsius-to-fahrenheit.html', // Already in sidebar
        'fahrenheit-to-celsius': 'content/temperature/fahrenheit-to-celsius.html', // Already in sidebar
    
        // Time (from sidebar)
        'time': 'content/time/time.html', // Category page
        'seconds-to-minutes': 'content/time/seconds-to-minutes.html',
        'minutes-to-hours': 'content/time/minutes-to-hours.html',
        'hours-to-days': 'content/time/hours-to-days.html',
        'days-to-weeks': 'content/time/days-to-weeks.html',
        'years-to-hours': 'content/time/years-to-hours.html',
        'microseconds-to-nanoseconds': 'content/time/microseconds-to-nanoseconds.html',
        'sidereal-days-to-solar-days': 'content/time/sidereal-days-to-solar-days.html',
        'fortnights-to-days': 'content/time/fortnights-to-days.html',
        'lustrums-to-years': 'content/time/lustrums-to-years.html',
    
        // Speed/Velocity (from sidebar)
        'speed': 'content/speed/speed.html', // Category page
        'kilometers-per-hour-to-miles-per-hour': 'content/speed/kilometers-per-hour-to-miles-per-hour.html',
        'meters-per-second-to-feet-per-second': 'content/speed/meters-per-second-to-feet-per-second.html',
        'meters-per-second-to-miles-per-hour': 'content/speed/meters-per-second-to-miles-per-hour.html',
        'miles-per-hour-to-kilometers-per-hour': 'content/speed/miles-per-hour-to-kilometers-per-hour.html',
        'knots-to-miles-per-hour': 'content/speed/knots-to-miles-per-hour.html',
        'mach-to-meters-per-second': 'content/speed/mach-to-meters-per-second.html',
        'furlongs-per-fortnight-to-meters-per-second': 'content/speed/furlongs-per-fortnight-to-meters-per-second.html',
        // From Common Conversions (Speed)
        'mph-to-kph': 'content/speed/mph-to-kph.html',
        'kph-to-mph': 'content/speed/kph-to-mph.html', // Alias for kilometers-per-hour-to-miles-per-hour
    
        // Energy/Work (from sidebar)
        'energy': 'content/energy/energy.html', // Category page
        'joules-to-calories': 'content/energy/joules-to-calories.html',
        'kilowatt-hours-to-joules': 'content/energy/kilowatt-hours-to-joules.html',
        'btu-to-joules': 'content/energy/btu-to-joules.html',
        'electronvolts-to-joules': 'content/energy/electronvolts-to-joules.html',
        'ergs-to-joules': 'content/energy/ergs-to-joules.html',
        'foot-pounds-to-newton-meters': 'content/energy/foot-pounds-to-newton-meters.html',
    
        // Power (from sidebar)
        'power': 'content/power/power.html', // Category page
        'watts-to-horsepower': 'content/power/watts-to-horsepower.html',
        'horsepower-to-kilowatts': 'content/power/horsepower-to-kilowatts.html',
        'btu-per-hour-to-watts': 'content/power/btu-per-hour-to-watts.html',
        'ergs-per-second-to-watts': 'content/power/ergs-per-second-to-watts.html',
        'cheval-vapeur-to-horsepower': 'content/power/cheval-vapeur-to-horsepower.html',
        // From Common Conversions (Power)
        'hp-to-kw': 'content/power/hp-to-kw.html', // Alias for horsepower-to-kilowatts
        'kw-to-hp': 'content/power/kw-to-hp.html', // Alias for watts-to-horsepower (approximation)
    
        // Pressure (from sidebar)
        'pressure': 'content/pressure/pressure.html', // Category page
        'pascals-to-atmospheres': 'content/pressure/pascals-to-atmospheres.html',
        'bars-to-psi': 'content/pressure/bars-to-psi.html',
        'torr-to-millibars': 'content/pressure/torr-to-millibars.html',
        'inches-of-mercury-to-pascals': 'content/pressure/inches-of-mercury-to-pascals.html',
        'at-to-bars': 'content/pressure/at-to-bars.html',
    
        // Force (from sidebar)
        'force': 'content/force/force.html', // Category page
        'newtons-to-pounds-force': 'content/force/newtons-to-pounds-force.html',
        'kilogram-force-to-newtons': 'content/force/kilogram-force-to-newtons.html',
        'dynes-to-newtons': 'content/force/dynes-to-newtons.html',
        'poundals-to-newtons': 'content/force/poundals-to-newtons.html',
    
        // Angle (from sidebar)
        'angle': 'content/angle/angle.html', // Category page
        'degrees-to-radians': 'content/angle/degrees-to-radians.html',
        'radians-to-degrees': 'content/angle/radians-to-degrees.html',
        'gradians-to-degrees': 'content/angle/gradians-to-degrees.html',
        'mils-to-degrees': 'content/angle/mils-to-degrees.html',
        'degrees-to-mils': 'content/angle/degrees-to-mils.html',
        // From Common Conversions (Angle)
        'radians-to-degrees': 'content/angle/radians-to-degrees.html', // Already in sidebar
        'degrees-to-radians': 'content/angle/degrees-to-radians.html', // Already in sidebar
    
        // Data/Storage (from sidebar)
        'data': 'content/data/data.html', // Category page
        'bytes-to-kilobytes': 'content/data/bytes-to-kilobytes.html',
        'megabytes-to-gigabytes': 'content/data/megabytes-to-gigabytes.html',
        'terabytes-to-petabytes': 'content/data/terabytes-to-petabytes.html',
        'bits-to-nibbles': 'content/data/bits-to-nibbles.html',
        'exabytes-to-zettabytes': 'content/data/exabytes-to-zettabytes.html',
    
        // Fuel Efficiency (from sidebar)
        'fuel-efficiency': 'content/fuel-efficiency/fuel-efficiency.html', // Category page
        'mpg-to-liters-per-100km': 'content/fuel-efficiency/mpg-to-liters-per-100km.html',
        'kilometers-per-liter-to-mpg': 'content/fuel-efficiency/kilometers-per-liter-to-mpg.html',
        'mpg-imperial-to-mpg-us': 'content/fuel-efficiency/mpg-imperial-to-mpg-us.html',
    
        // Cooking (from sidebar)
        'cooking': 'content/cooking/cooking.html', // Category page
        'teaspoons-to-tablespoons': 'content/cooking/teaspoons-to-tablespoons.html',
        'cups-to-ounces': 'content/cooking/cups-to-ounces.html',
        'pinches-to-grams': 'content/cooking/pinches-to-grams.html',
        'dashes-to-milliliters': 'content/cooking/dashes-to-milliliters.html',
    
        // Specialized (from sidebar)
        'specialized': 'content/specialized/specialized.html', // Category page
        'astronomical-units-to-kilometers': 'content/specialized/astronomical-units-to-kilometers.html',
        'planck-length-to-meters': 'content/specialized/planck-length-to-meters.html',
        'becquerels-to-curies': 'content/specialized/becquerels-to-curies.html',
        'sieverts-to-rems': 'content/specialized/sieverts-to-rems.html',
        'candela-to-lumens': 'content/specialized/candela-to-lumens.html',
        'knots-to-fathoms-per-minute': 'content/specialized/knots-to-fathoms-per-minute.html',
        'gauss-to-teslas': 'content/specialized/gauss-to-teslas.html',
        'poise-to-pascal-seconds': 'content/specialized/poise-to-pascal-seconds.html',
        'reyns-to-pascal-seconds': 'content/specialized/reyns-to-pascal-seconds.html',
    
        // Other Conversions
        'mm-to-sae': 'content/other/mm-to-sae.html', // Assuming 'other' as category
        'formtest' : 'content/let_us_know_test.html'
    };

    // Load the appropriate content
    const contentFile = contentMap[page] || contentMap['home'];
    console.log('Fetching content from:', contentFile); // Debug: Check the file path

    fetch(contentFile)
        .then(response => {
            if (!response.ok) throw new Error('Content not found');
            return response.text();
        })
        .then(html => {
            contentContainer.innerHTML = html;

            // After loading content, execute any scripts within it
            requestAnimationFrame(() => {
                const scripts = contentContainer.getElementsByTagName('script');
                for (let script of scripts) {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                }
            });
        })
        .catch(error => {
            contentContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
            console.error(error);
        });
    // Meta data for each page
    const metaData = {
        'home': {
            title: 'AnyConversion - Unit Converter',
            description: 'Discover a versatile unit converter for length, weight, volume, and more at AnyConversion. Convert units easily and accurately.',
            keywords: 'unit converter, conversion tool, length, weight, volume'
        },
        'let-us-know': {
            title: 'Let Us Know - AnyConversion',
            description: 'Share your feedback or request a new unit conversion at AnyConversion. Help us improve our free online converter tool.',
            keywords: 'feedback, conversion request, unit converter'
        },
        'length': {
            title: 'Length Converter - AnyConversion',
            description: 'Convert length units like meters to feet, kilometers to miles, and more with AnyConversion’s free length converter.',
            keywords: 'length converter, meters to feet, kilometers to miles'
        },
        'meters-to-feet': {
            title: 'Meters to Feet Converter - AnyConversion',
            description: 'Easily convert meters to feet with AnyConversion’s accurate and free online tool.',
            keywords: 'meters to feet, length conversion, unit converter'
        },
        'kilometers-to-miles': {
            title: 'Kilometers to Miles Converter - AnyConversion',
            description: 'Convert kilometers to miles quickly and accurately with AnyConversion’s free online converter.',
            keywords: 'kilometers to miles, length conversion, unit converter'
        },
        'weight': {
            title: 'Weight Converter - AnyConversion',
            description: 'Convert weight units like kilograms to pounds, ounces to grams, and more with AnyConversion’s free tool.',
            keywords: 'weight converter, kilograms to pounds, ounces to grams'
        },
        'kilograms-to-pounds': {
            title: 'Kilograms to Pounds Converter - AnyConversion',
            description: 'Convert kilograms to pounds effortlessly with AnyConversion’s free and precise online tool.',
            keywords: 'kilograms to pounds, weight conversion, unit converter'
        },
        // Add more pages here (e.g., 'volume', 'liters-to-gallons', etc.)
        // Default fallback
        'default': {
            title: 'AnyConversion - Unit Converter',
            description: 'Convert units easily with AnyConversion’s free online tool for all your conversion needs.',
            keywords: 'unit converter, conversion tool, online calculator'
        }
    };

    // Function to update meta tags dynamically
    function updateMetaTags(page) {
        const meta = metaData[page] || metaData['default'];
        
        // Update title
        document.title = meta.title;
        
        // Update or create description meta tag
        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
            descTag = document.createElement('meta');
            descTag.name = 'description';
            document.head.appendChild(descTag);
        }
        descTag.content = meta.description;
        
        // Update or create keywords meta tag
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (!keywordsTag) {
            keywordsTag = document.createElement('meta');
            keywordsTag.name = 'keywords';
            document.head.appendChild(keywordsTag);
        }
        keywordsTag.content = meta.keywords;
    }

    // Modify existing loadContent function to include meta tag updates
    function loadContent(page) {
        const contentDiv = document.getElementById('content');
        const url = contentMap[page] || contentMap['home'];
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                updateMetaTags(page); // Update meta tags after loading content
                // Reattach any scripts if needed (e.g., for let-us-know form)
                if (page === 'let-us-know') {
                    const scripts = contentDiv.getElementsByTagName('script');
                    for (let script of scripts) {
                        const newScript = document.createElement('script');
                        newScript.textContent = script.textContent;
                        document.body.appendChild(newScript);
                    }
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentDiv.innerHTML = '<p>Error loading content.</p>';
            });
    }

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
});