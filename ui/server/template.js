import serialize from 'serialize-javascript';

export default function template(body, data) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>template joe Pro MERN Stack</title>
    <style>
        table.table-hover tr {
            cursor: pointer;
        }

        a.active {
            background-color: #D8D8F5;
        }

        input.invalid {
            border-color: red;
        }

        div.error {
            color: red;
        }
    </style>
</head>


<body>
  <!-- Page generated from template. -->
  <div id="contents">${body}</div>
  <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
  <script src="/env.js"></script>
  <script src="/vendor.bundle.js"></script>
  <script src="/app.bundle.js"></script>
</body>
</html>
`;
}