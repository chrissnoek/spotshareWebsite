exports.id = "server";
exports.modules = {

/***/ "./src/Register.jsx":
/*!**************************!*\
  !*** ./src/Register.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/src/Register.jsx: Identifier 'data' has already been declared (63:14)\n\n\u001b[0m \u001b[90m 61 | \u001b[39m        console\u001b[33m.\u001b[39mlog(input)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 62 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 63 | \u001b[39m        \u001b[36mconst\u001b[39m data \u001b[33m=\u001b[39m await graphQLFetch(query\u001b[33m,\u001b[39m { input }\u001b[33m,\u001b[39m \u001b[36mtrue\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m              \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 64 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 65 | \u001b[39m        \u001b[36mif\u001b[39m (data) {\u001b[0m\n\u001b[0m \u001b[90m 66 | \u001b[39m            console\u001b[33m.\u001b[39mlog(data)\u001b[33m;\u001b[39m\u001b[0m\n    at Object._raise (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:742:17)\n    at Object.raiseWithData (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:735:17)\n    at Object.raise (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:729:17)\n    at ScopeHandler.checkRedeclarationInScope (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:4781:12)\n    at ScopeHandler.declareName (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:4747:12)\n    at Object.checkLVal (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9229:22)\n    at Object.parseVarId (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11785:10)\n    at Object.parseVar (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11760:12)\n    at Object.parseVarStatement (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11572:10)\n    at Object.parseStatementContent (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11171:21)\n    at Object.parseStatement (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11104:17)\n    at Object.parseBlockOrModuleBlockBody (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11679:25)\n    at Object.parseBlockBody (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11665:10)\n    at Object.parseBlock (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11649:10)\n    at Object.parseFunctionBody (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:10656:24)\n    at Object.parseArrowExpression (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:10625:10)\n    at Object.parseParenAndDistinguishExpression (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:10243:12)\n    at Object.parseExprAtom (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9969:21)\n    at Object.parseExprAtom (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:4626:20)\n    at Object.parseExprSubscripts (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9624:23)\n    at Object.parseMaybeUnary (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9604:21)\n    at Object.parseExprOps (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9474:23)\n    at Object.parseMaybeConditional (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9447:23)\n    at Object.parseMaybeAssign (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:9402:21)\n    at Object.parseClassProperty (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:12142:25)\n    at Object.pushClassProperty (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:12093:30)\n    at Object.parseClassMemberWithIsStatic (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:12026:14)\n    at Object.parseClassMember (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11963:10)\n    at /Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:11908:14\n    at Object.withTopicForbiddingContext (/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui/node_modules/@babel/parser/lib/index.js:10979:14)");

/***/ })

};
//# sourceMappingURL=server.4ef7bad519d987cc09d6.hot-update.js.map