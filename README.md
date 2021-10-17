<h1 align="center">
  Simple API
</h1>

<p align="center">
  <img alt="Author" src="https://img.shields.io/badge/Author-Pedro%20L%20S%20Silva-6558c3?style=plastic" />
	<img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/pedrolssilva/saudeId-API?color=6558C3&style=plastic" />
	<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/pedrolssilva/saudeId-API?color=6558C3&style=plastic" />
	<img alt="License" src="https://img.shields.io/badge/status-Conclu%C3%ADdo-6558C3?style=plastic" />
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000" alt="License">   
</p>

<br>

## 🧪 Technologies

This project was developed with the following technologies:

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/pt-br/)
- [Insomnia](https://insomnia.rest/)
- [Git](https://git-scm.com/)
- [Heroku](https://dashboard.heroku.com/apps)


## 🚀 How to execute

clone the project and access his folder.

```bash
$ git clone https://github.com/pedrolssilva/saudeId-API.git
$ cd saudeId-API
```

To start it, follow the steps underneath:
```bashRE
# Install dependencies
$ yarn

# Start the project
$ yarn start
```
The app will be available in your browser by the address  http://localhost:5000.


## 💻 Project

This API was publihsed and can be used accessing  [Here](https://saude-id-api.herokuapp.com/).

<h3>Description</h3>
This API was designed to provide a simple list of items and item detail in a paginated way.

To be allowed to get items and item detail is necessary to make a registration and made login to be possible send the required token.

The token has a duration of 30 minutes.

<h3>Available endpoints and how to use those.</h3>
<p><strong>BaseUrl:</strong> https://saude-id-api.herokuapp.com or http://localhost:5000 (if running locally)</p>

<h4>Register
	<p><strong>endpoint:</strong> /login/create
	</br>
	<strong>type:</strong> POST	
	</br>
	<strong>body fields required:</strong> {email, password, repeatPassword}
	</br>
	</p>
</h4>

<h4>Login
	<p><strong>endpoint:</strong> /login/in
	</br>
	<strong>type:</strong> POST	
	</br>
	<strong>body fields required:</strong> {email, password}
	</br>
	<strong>Return:</strong> {user: text, token: text}
	</br>
	</p>
</h4>

<h4>Logout
	<p><strong>endpoint:</strong> /login/out
	</br>
	<strong>type:</strong> POST	
	</br>
	<strong>body fields required:</strong> {email}
	</br>
	<strong>Return:</strong> {token: null}
	</br>
	</p>
</h4>

<h4>List items
	<p><strong>endpoint:</strong> /items/list
	</br>
	<strong>type:</strong> GET	
	</br>
	<strong>header field required:</strong> [access_token: "token provided in login"]
	</br>
	<strong>query params required:</strong> {type: "Movie", skip: 0, limit: 5}
	</br>
	<strong>Return:</strong> {count: number, items: array}
	</br>
	</p>
</h4>

<h4>Item detail
	<p><strong>endpoint:</strong> items/:id
	</br>
	<strong>type:</strong> GET	
	</br>
	<strong>header field required:</strong> [access_token: "token provided in login"]
	</br>
	<strong>params required:</strong> {id: "itemId"}
	</br>
	<strong>Return:</strong> {itemDetail: {_id: text, itemId: text, synopsis: text} }
  }
}
	</br>
	</p>
</h4>




## 📝 License

This project is under the license MIT. See the file [LICENSE](LICENSE.md) for more details.

---

💜 Made by Pedro L.
