# Datamap Visualizer

A page for visualizing records of data processing systems, as described [here](https://github.com/ethyca/typescript-takehome).

You can visit the project live [here](https://jocular-granita-04c7a4.netlify.app/), or, to run the project locally:

1. Clone the repository into a new directory.
2. In the project directory, run `npm install` and then `npm run dev`.
3. Go to the URL listed in the terminal.

Below you can find a description of the work I did and how long it took me, as well as some of my retrospective thoughts about the project.  Thanks for your time!

## Time Breakdown

I spent around 4.5 hours on this in total-- slightly over the limit, I know, but at exactly 4 hours I was dead in the middle of implementing filtering and everything was still broken, so I figured I'd just finish up and get it back to where it was functioning again.  That total time consisted, roughly, of:

### Preliminary Work (30 minutes)

* Reading and understanding project requirements
* Familiarizing myself with the shape of the data I was working with and the Fideslang model
* Bootstrapping project with Vite/installing libraries

### Grid Layout (1 hour)

* Generating columns with appropriate headings for the system types and filling them with (at this time, blank) cards
* Fine-tuning card and column size and positioning, including breakpoints for different layouts at different screen sizes

### Card Content (90 minutes)

* Deciding which information from the data to include and how to format it
* Adding nicer colors/fonts to cards
* Writing methods for better readability and to prevent redundant data from being displayed

### Filtering (90 minutes)

* Implementing filtering by data use using a filter variable stored in the state
* Building an interface for choosing a filter parameter
* Setting up the filter interface to populate itself with options dynamically from the data
* Refining layout for the filter interface

## Thoughts

I thought this challenge was pretty great-- the data to display had enough going on that I felt like I could go in many directions, but was still consistent in shape (very helpful for something on a strict time limit) and easy to understand.  If anything, I would have liked to have more time to work on this, I had a lot of ideas that I wasn't able to implement in the end (more on that in a moment).

### Decisions made

The sample data included a pair of `orders_management` systems that were exactly the same; I wasn't sure precisely what the intended behavior was for duplicates, but I implemented a check that would run before anything else happened that would eliminate duplicates (checked by their Fideslang key).  If that wasn't the intended behavior, it would be very easy to eliminate the check altogether, or change it to have more fine-grained detection or handling of duplicates.

Some of the data is not included on the cards at all, notably dependencies and data subjects.  Originally I had planned for a feature to show dependencies off of the cards but didn't end up having time to implement it, and the data subject of every system in the given data was identical (`"customer"`) so I didn't feel that that was important.  If the app had to handle arbitrary data where that could be more significant, it would be very easy to update the cards to include it.

The layout of the app is also based on the assumption that the possible system types would always consist of precisely "Application", "Service", "Database", "Integration".  If those system types could vary and there could be more or fewer of them, some changes could be required.

### Possible refactors/improvements

(This is obviously not intended to be an exhaustive list!  I'm sure there are lots of places this could be improved, but these are the most obvious to me.)

* When filtering by data use, the page filters which *systems* it shows, but the content of each system's card is static, even though the data use only applies to a subset of the collected data categories; this is misleading and should be fixed
* It would be preferable not to pass the entire data set as a prop to each column individually, and instead do the "sorting" into columns before generating
* Instead of re-running the methods that parse the raw data into their more readable form every time the page renders, only running them once and storing the "prettified" data in state would be preferable
* Taking a more classically object-oriented approach and having stuff like `parseCategories` be a class method for a `System` object instead of a helper method for the `SystemCard` element would likely improve readability

### Extra features

It would have been to include an option to display the dependencies of a system; my original plan for this was to include a button on each card that would visually highlight the systems it depended on and/or grey out the ones it didn't temporarily, but I ended up having to skip it for time.

The filter is perfectly functional (barring the issue with showing not-necessarily-related data categories I mentioned above), but there are lots of other ways the data could be filtered and sorted, especially with a theoretical larger data set that had a broader variety of content.

I also didn't end up have time to do much fancy visual stuff-- it would have been nice, for instance, to animate cards to fade in or out to make the transition smoother when the filter changes, or at the very least briefly transition to a loading spinner or similar.