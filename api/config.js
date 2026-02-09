function Account(id, username, name, isFrom, description, profileImageUrl, followersQtd) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.isFrom = isFrom;
    this.description = description;
    this.profileImageUrl = `/db/accounts/${profileImageUrl}`;
    this.followersQtd = followersQtd;
}

function Post(id, accountId, imageUrl, shortDescription, longDescription, postedAt, hasProduct = false, productId = undefined, saved = false) {
    this.id = id;
    this.accountId = accountId;
    this.imageUrl = `/db/posts/${imageUrl}`;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.postedAt = postedAt;

    this.hasProduct = hasProduct;
    this.productId = productId;
    this.saved = saved
}

function AppNotification(id, accountId, title) {
    this.id = id;
    this.accountId = accountId;
    this.title = title;
}

function Product(id, name, description, imageUrl, price, inCart = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = `/db/products/${imageUrl}`;
    this.price = price;
    this.inCart = inCart;
}

function DataBase() {
    this.loggedUserId = 0;
    this.accountsList = [];
    this.postsList = [];
    this.notificationsList = [];
    this.productsList = [];

    // Is
    this.isThisAccountLogged = (account) => this.getLoggedAccount() === account;
    this.isThereNewNotifications = () => this.notificationsList.length > 0;

    // Get
    this.getLoggedAccount = () => this.accountsList.find(account => account.id === this.loggedUserId);
    this.getLoggedAccountId = () => this.loggedUserId;

    this.getAccounts = () => this.accountsList;
    this.getAccountById = (id) => {
        let account = this.accountsList.find(account => account.id === id);
        return { ...account, postsQtd: this.getPostsByAccountId(id).length };
    };
    this.getAccountsWith = (search) => this.accountsList.filter(account => {
        const clearSearch = search.toLowerCase();

        if (account.username.toLowerCase().includes(clearSearch)) return true;
        if (account.name.toLowerCase().includes(clearSearch)) return true;
        if (account.description.toLowerCase().includes(clearSearch)) return true;

        return false;
    });

    this.getPosts = () => this.postsList;
    this.getPostById = (id) => this.postsList.find(post => post.id === id);
    this.getPostsByAccountId = (accountId) => this.postsList.filter(post => post.accountId === accountId);
    this.getSavedPosts = () => this.postsList.filter(post => post.saved);

    this.getNotifications = () => this.notificationsList;

    this.getProducts = () => this.productsList;
    this.getProductById = (id) => this.productsList.find(product => product.id === id);
    this.getInCartProducts = () => this.productsList.filter(product => product.inCart);
    this.getInCartProductsQtd = () => this.productsList.filter(product => product.inCart).length;

    // Create
    this.createNewAccount = (id, username, name, isFrom, description, profileImageUrl, followersQtd) => {
        this.accountsList.push(new Account(id, username, name, isFrom, description, profileImageUrl, followersQtd));
    };

    this.createNewPost = (id, accountId, imageUrl, shortDescription, longDescription, postedAt, hasProduct, productId, saved) => {
        this.postsList.push(new Post(id, accountId, imageUrl, shortDescription, longDescription, postedAt, hasProduct, productId, saved));
    };

    this.createNewNotification = (id, accountId, title) => {
        this.notificationsList.push(new AppNotification(id, accountId, title));
    };

    this.createNewProduct = (id, name, description, imageUrl, price, inCart) => {
        this.productsList.push(new Product(id, name, description, imageUrl, price, inCart));
    };

    // Show/Display
    this.showAllDataBase = () => {
        this.showAccounts();
        this.showProducts();
        this.showNotifications();
    };

    this.showAccounts = () => {
        const qtd = this.accountsList.length;
        console.log(`Accounts(${qtd})(${this.postsList.length}):`)
        if (!qtd) {
            console.log('| No accounts...');
            return;
        }

        for (let ac of this.accountsList) {
            console.log(`| ${ac.id} - ${ac.name}(${ac.username})(${this.getPostsByAccountId(ac.id).length})(${ac.followersQtd}) - ${ac.isFrom} - ${ac.description} - ${ac.profileImageUrl}`);
            this.showPostsByAccountId(ac.id);
        }
    };

    this.showPostsByAccountId = (accountId) => {
        for (let p of this.getPostsByAccountId(accountId)) {
            console.log(`|     ${p.id} - ${p.shortDescription} - ${p.postedAt}${p.saved ? ` - Saved` : ''} - ${p.longDescription}`);
        }
    };

    this.showProducts = () => {
        const qtd = this.productsList.length;
        console.log(`Products(${qtd}):`)
        if (!qtd) {
            console.log('| No products...');
            return;
        }

        for (let pd of this.productsList) {
            console.log(`| ${pd.id} - ${pd.name} - ${pd.price}${pd.inCart ? ` - In Cart` : ''} - ${pd.description}`);
        }
    };

    this.showNotifications = () => {
        const qtd = this.notificationsList.length;
        console.log(`Notifications(${qtd}):`)
        if (!qtd) {
            console.log('| No notifications...');
            return;
        }

        for (let notification of this.notificationsList) {
            let conta = this.getAccountById(notification.accountId);
            console.log(`| ${notification.id} - ${conta.name} - ${notification.title}`)
        }
    };
}

export default DataBase;