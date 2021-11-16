const api = 'https://hacker-news.firebaseio.com/v0'
const json = '.json?print=pretty'

// Get top 50 stories.
export function getStories(type) {
    return fetch(`${api}/${type}stories${json}`)
        .then((res) => res.json())
        .then((ids) => {
            if (!ids) {
                throw new Error(`Something went wrong fetching ${type} posts. Please try again later.`)
            }

            return ids.slice(0, 50)
        })
        .then((ids) => Promise.all(ids.map(fetchItem)))
        .then((items) => filterDead(items))
        .then((items) => filterDeleted(items))
}


// Get post
export function getPost(id) {
    return fetchItem(id)
}

export function getUser(username) {
    return fetch(`${api}/user/${username}${json}`)
        .then((res) => res.json())
        .then((user) => {
            if (!user) {
                throw new Error ('Something went wrong fetching the user. Please try again later.')
            }

            return user
        })
}

export function getChildItems(children, skipTypeFilter = false) {
    return Promise.all(children.slice(0, 50).map(fetchItem))
        .then((items) => filterDead(items))
        .then((items) => filterDeleted(items))
        .then((items) => filterPostType(items, skipTypeFilter))
        .catch((error) => error)
}

function fetchItem (id) {
    return fetch(`${api}/item/${id}${json}`)
        .then((res) => res.json())
        .then((item) => {
            if (!item) {
                throw new Error (`Something went wrong fetching item #${id}. Please try again later.`)
            }

            return item
        })
}

function filterDead (items) {
    return items.filter(({ dead }) => dead === false || dead === undefined)
}

function filterDeleted (items) {
    return items.filter(({ deleted }) => deleted === false || deleted === undefined)
}

function filterPostType (items, skip = false) {
    if (skip) return items    

    return items.filter(({ type }) => type === 'story' || type === undefined)
}
