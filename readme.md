# Getting Started :D

> A simple example. I promise to write a better readme

Install:
    
```bash
npm i flaformatter
```

<br />

Import:

```js
import flaFormatter from 'flaformatter'
```

<br />

Use:

```js
<input maxlength={9} onChange={(a)=>flaFormatter(a,'cep')} />
```
> The maxLength is optional. It is used to limit the number of characters

<br />

Response: 
    
    99999-999


<br />

## Available formats :

<br />

- `rg`: 12.123.123-1

- `cpf`: 123.123.123-12

- `cnpj`: 12.123.123/1234-12

- `cpf/cnpj`: 123.123.123-12 or 12.123.123/1234-12

- `telefone`: 1234 1234

- `int`: 123456789

- `celular`: (12) 12345-1234

- `cep`: 12345-123

- `money`: 123.123.123,12

- `card`: 1234 1234 1234 1234

- `percent`: 12,34%

- `time`: 12:34

<br />

## Feature maxLength :

<br />

You can set thrid param as `true` to use flaformatter default maxLength.

example:

```js
<input onChange={(e)=>flaFormatter(e,'cep',true)} />
```
