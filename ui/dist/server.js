/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4988ab11184c238fdbc2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "server";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });

  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }

  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
/* eslint-disable node/no-unsupported-features/node-builtins */


var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
  logLevel = level;
};

module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;

  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/*globals __resourceQuery */
if (true) {
  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;

  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

  var checkForUpdate = function checkForUpdate(fromUpdate) {
    if (module.hot.status() === "idle") {
      module.hot.check(true).then(function (updatedModules) {
        if (!updatedModules) {
          if (fromUpdate) log("info", "[HMR] Update applied.");
          return;
        }

        __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

        checkForUpdate(true);
      }).catch(function (err) {
        var status = module.hot.status();

        if (["abort", "fail"].indexOf(status) >= 0) {
          log("warning", "[HMR] Cannot apply update.");
          log("warning", "[HMR] " + log.formatError(err));
          log("warning", "[HMR] You need to restart the application!");
        } else {
          log("warning", "[HMR] Update failed: " + log.formatError(err));
        }
      });
    }
  };

  setInterval(checkForUpdate, hotPollInterval);
} else {}
/* WEBPACK VAR INJECTION */}.call(this, "?1000"))

/***/ }),

/***/ "./server/render.jsx":
/*!***************************!*\
  !*** ./server/render.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/Page.jsx */ "./src/Page.jsx");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template.js */ "./server/template.js");
/* harmony import */ var _src_store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/store.js */ "./src/store.js");
/* harmony import */ var _src_routes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/routes.js */ "./src/routes.js");








async function render(req, res) {
  // to find the component that is being rendered (activeRoute)
  // we use matchPatch from RRD to return the correct route
  // which matches our current url (req.path)
  const activeRoute = _src_routes_js__WEBPACK_IMPORTED_MODULE_6__["default"].find(route => Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, route));
  console.log(req.path, 'activeRoute: ', activeRoute);
  let initialData;

  if (activeRoute && activeRoute.component.fetchData) {
    // get the this.props.match to find the /edit/2 id from url, and send with fetchData function
    const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, activeRoute); // get the index search query of the url

    const index = req.url.indexOf('?'); // index -1 is given when there is no ? sign

    const search = index !== -1 ? req.url.substr(index) : null;
    initialData = await activeRoute.component.fetchData(match, search);
    console.log(initialData);
  }

  _src_store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData = initialData;
  const context = {};
  const element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
    location: req.url,
    context: context
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  const body = react_dom_server__WEBPACK_IMPORTED_MODULE_1___default.a.renderToString(element);

  if (context.status === 404) {
    res.status(404);
  }

  if (context.url) {
    return res.redirect(301, context.url);
  } else {
    res.send(Object(_template_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body, initialData));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ }),

/***/ "./server/template.js":
/*!****************************!*\
  !*** ./server/template.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return template; });
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serialize-javascript */ "serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_0__);

function template(body, data) {
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
  <script>window.__INITIAL_DATA__ = ${serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default()(data)}</script>
  <script src="/env.js"></script>
  <script src="/vendor.bundle.js"></script>
  <script src="/app.bundle.js"></script>
</body>
</html>
`;
}

/***/ }),

/***/ "./server/uiserver.js":
/*!****************************!*\
  !*** ./server/uiserver.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-proxy-middleware */ "http-proxy-middleware");
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! source-map-support */ "source-map-support");
/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(source_map_support__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _render_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render.jsx */ "./server/render.jsx");





const app = express__WEBPACK_IMPORTED_MODULE_1___default()();
source_map_support__WEBPACK_IMPORTED_MODULE_3___default.a.install();
dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && "development" !== 'production') {
  console.log('Adding dev middleware, enabling HMR');
  /* eslint "global-require":"off"*/

  /* eslint "import/no-extraneous-dependencies":"off"*/

  const webpack = __webpack_require__(/*! webpack */ "webpack");

  const devMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");

  const hotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware");

  const config = __webpack_require__(/*! ../webpack.config.js */ "./webpack.config.js")[0];

  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static('public'));
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  app.use('/graphql', http_proxy_middleware__WEBPACK_IMPORTED_MODULE_2___default()({
    target: apiProxyTarget
  }));
}

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

if (!process.env.UI_API_IMAGE_ENDPOINT) {
  process.env.UI_API_IMAGE_ENDPOINT = 'http://localhost:3000/api/images/upload';
}

if (!process.env.UI_SERVER_API_IMAGE_ENDPOINT) {
  process.env.UI_SERVER_API_IMAGE_ENDPOINT = process.env.UI_API_IMAGE_ENDPOINT;
}

app.get('/env.js', (req, res) => {
  const env = {
    UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
    UI_API_IMAGE_ENDPOINT: process.env.UI_SERVER_API_IMAGE_ENDPOINT
  };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});
app.get('*', (req, res, next) => {
  Object(_render_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])(req, res, next);
});
const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});

if (true) {
  module.hot.accept(/*! ./render.jsx */ "./server/render.jsx", function() { /* harmony import */ _render_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render.jsx */ "./server/render.jsx");
 });
}

/***/ }),

/***/ "./src/About.jsx":
/*!***********************!*\
  !*** ./src/About.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return About; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");



class About extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData() {
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_2__["default"])('query {about}');
    return data;
  }

  constructor(props) {
    super(props);
    const apiAbout = _store_js__WEBPACK_IMPORTED_MODULE_1__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_1__["default"].initialData.about : null;
    this.state = {
      apiAbout
    };
  }

  async componentDidMount() {
    const {
      apiAbout
    } = this.state;

    if (apiAbout == null) {
      const data = await About.fetchData();
      this.setState({
        apiAbout: data.about
      });
    }
  }

  render() {
    const {
      apiAbout
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Issue Tracker version 0.9"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, apiAbout));
  }

}

/***/ }),

/***/ "./src/BlogPost.jsx":
/*!**************************!*\
  !*** ./src/BlogPost.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlogPost; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);




class BlogPost extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query articleBySlug($slug: String!){
            articleBySlug(slug: $slug) {
                id
                title
                body
                slug
            }
        }`;
    let {
      params: {
        [0]: slug
      }
    } = match;
    slug = slug.replace(/\//g, "");
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    return result;
  }

  constructor() {
    super();
    const articleBySlug = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData != null ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData.articleBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;
    this.state = {
      articleBySlug,
      slug: null
    };
  }

  componentDidUpdate(prevProps) {// const { match: { params: { id: prevId } } } = prevProps;
    // const { match: { params: { id } } } = this.props;
    // if (prevId !== id) {
    //     this.loadData();
    // }
  }

  componentDidMount() {
    const {
      articleBySlug
    } = this.state;

    if (articleBySlug === null) {
      this.loadData();
    }
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables 

    const data = await BlogPost.fetchData(match);

    if (data) {
      this.setState({
        articleBySlug: data.articleBySlug
      });
    }
  }

  render() {
    const {
      articleBySlug
    } = this.state;

    if (articleBySlug === null) {
      console.log('slug is nullllll');
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/niet-gevonden"
      });
    }

    ;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, articleBySlug.title));
  }

}

/***/ }),

/***/ "./src/Contents.jsx":
/*!**************************!*\
  !*** ./src/Contents.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Contents; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./src/routes.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




function Contents() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    from: "/",
    to: "/fotos",
    exact: true
  }), _routes__WEBPACK_IMPORTED_MODULE_2__["default"].map(attrs => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], _extends({}, attrs, {
    key: attrs.path
  }))));
}

/***/ }),

/***/ "./src/DateInput.jsx":
/*!***************************!*\
  !*** ./src/DateInput.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function displayFormat(date) {
  return date != null ? date.toDateString() : '';
}

function editFormat(date) {
  // to ISOString returns 2011-10-05T14:48:00.000Z, and we only want to have first 10 characters
  return date != null ? date.toISOString().substr(0, 10) : '';
}

function unformat(str) {
  // we want to store a correct Date format in db
  const val = new Date(str); // check if the number (val) is a valid number and return the value

  return Number.isNaN(val.getTime()) ? null : val;
}

class DateInput extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur(e) {
    // get the input value and oldValid from state
    const {
      value,
      valid: oldValid
    } = this.state; // get the functions from parent

    const {
      onValidityChange,
      onChange
    } = this.props; // get date in javascript-readable Format

    const dateValue = unformat(value); // valid is if value is empty string, or dateValue is not null

    const valid = value === "" || dateValue != null; // if the valid state changed, the function is called with current event and valid property

    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, valid);
    } // set own state with new info


    this.setState({
      focused: false,
      valid
    }); // change the parents state value if the form is valid

    if (valid) onChange(e, dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({
        value: e.target.value
      });
    }
  }

  render() {
    const {
      valid,
      focused,
      value
    } = this.state;
    const {
      value: origValue,
      name
    } = this.props;
    const className = !valid && !focused ? 'invalid' : null;
    const displayValue = focused || !valid ? value : displayFormat(origValue);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      size: 20,
      name: name,
      className: className,
      value: displayValue,
      placeholder: focused ? 'yyyy-mm-dd' : null,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (DateInput);

/***/ }),

/***/ "./src/LocationDetailStrapi.jsx":
/*!**************************************!*\
  !*** ./src/LocationDetailStrapi.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocationDetailStrapi; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__);
/* globals React */

/* eslint "react/jsx-no-undef":"off" */










class LocationDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query locationBySlug($slug: String!){
            locationBySlug(slug: $slug) {
                title
                photos {
                    id
                    title
                    slug
                    photo {
                        id
                        name
                        url
                    }
                }
                desc
                slug
                id
                longitude
                latitude
            }
        }`;
    let {
      params: {
        id: slug
      }
    } = match;
    console.log(match);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    return result;
  }

  constructor() {
    super();
    const locationBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.locationBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      locationBySlug,
      redirect: false,
      zoom: 13,
      userLocationKnown: false,
      userMarker: null,
      userLocation: {
        longitude: null,
        latitude: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (prevId !== id) {
      this.loadData();
    }
  }

  componentDidMount() {
    const {
      locationBySlug
    } = this.state;

    if (locationBySlug === null) {
      this.loadData();
    } // loading leaflet in componentDidMount because it doenst support SSR


    const L = __webpack_require__(/*! leaflet */ "leaflet");

    const userMarker = new L.Icon({
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    }); // get users position

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.setState(prevState => ({ ...prevState,
        userMarker,
        userLocationKnown: true,
        userLocation: {
          longitude: crd.longitude,
          latitude: crd.latitude
        }
      }));
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      fetch('https://ipapi.co/json').then(res => res.json()).then(location => {
        this.setState(prevState => ({ ...prevState,
          userMarker,
          userLocationKnown: true,
          userLocation: {
            longitude: location.longitude,
            latitude: location.latitude
          }
        }));
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables 

    const data = await LocationDetailStrapi.fetchData(match);

    if (data.locationBySlug != null) {
      this.setState({
        locationBySlug: data.locationBySlug
      });
    } else {
      console.log('return not found');
      this.setState({
        redirect: true
      });
      console.log(this.state);
    }
  }

  render() {
    const {
      locationBySlug,
      redirect
    } = this.state;

    if (redirect) {
      console.log('redirect', redirect);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/niet-gevonden"
      });
    }

    if (locationBySlug === null) return null;
    const {
      userLocation,
      userLocationKnown,
      userMarker
    } = this.state;
    const {
      photos
    } = locationBySlug;
    const position = [locationBySlug.longitude, locationBySlug.latitude];
    const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-2xl font-bold mb-1 text-gray-800 block"
    }, locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-gray-600"
    }, locationBySlug.desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
      className: "map",
      id: "photoLocation",
      center: position,
      zoom: this.state.zoom
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: position
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Foto locatie")), userLocationKnown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: calculatedUserLocation,
      icon: userMarker
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: "text-xl font-bold mb-1 text-gray-800 block"
    }, "Foto's gemaakt op fotolocatie ", locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "-mx-2"
    }, photos.map(photoItem => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationPhotoItem, {
        item: photoItem,
        key: photoItem.id
      });
    }))));
  }

}

function LocationPhotoItem(props) {
  const itemPhoto = props.item.photo[0];
  const selectedLocation = `/foto/${props.item.slug}`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full inline-block md:w-1/2 lg:w-1/3 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoCard rounded relative shadow-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative rounded overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: selectedLocation,
    className: "absolute w-full h-full z-10",
    title: "Bekijk foto nu"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: itemPhoto.url,
    className: "object-cover  w-full h-48  block",
    alt: "Foto"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoContent p-4 absolute bottom-0 left-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoInfo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-white"
  }, props.item.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear"
  }))))));
  ;
}

/***/ }),

/***/ "./src/NotFound.jsx":
/*!**************************!*\
  !*** ./src/NotFound.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (({
  staticContext = {}
}) => {
  staticContext.status = 404;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Sorry, pagina niet gevonden");
});

/***/ }),

/***/ "./src/Page.jsx":
/*!**********************!*\
  !*** ./src/Page.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contents_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contents.jsx */ "./src/Contents.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class NavBar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super();

    _defineProperty(this, "closeMenu", () => {
      this.setState({
        isOpen: false
      });
    });

    _defineProperty(this, "toggleOpen", () => {
      const {
        isOpen
      } = this.state;
      this.setState({
        isOpen: !isOpen
      });
    });

    this.state = {
      isOpen: false
    };
  }

  render() {
    let menuClassName = 'px-2 pt-2 pb-4 sm:p-0 sm:flex';
    menuClassName += this.state.isOpen ? ' block' : ' hidden';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
      className: "bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      exact: true,
      to: "/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png",
      className: "h-8",
      alt: "Spotshare, de mooiste fotolocaties bij jou in de buurt"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sm:hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.toggleOpen,
      type: "button",
      className: "text-gray-400 hover:text-white focus:text-white focus:outline-none"
    }, this.state.isOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiX"], {
      className: "fill-current text-white"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiMenu"], {
      className: "fill-current text-white"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
      className: menuClassName
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/fotolocatie/volendam",
      className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
    }, "TestLocatie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/foto/mooi-valencia",
      className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
    }, "TestFoto"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/foto/toevoegen",
      className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
    }, "Uploaden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      exact: true,
      to: "/",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "Home"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      exact: true,
      to: "/fotos",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "Photos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/report",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "Report"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/about",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "About")));
  }

}

function Page() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavBar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Contents_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_4__["ToastContainer"], null));
}

/***/ }),

/***/ "./src/PhotoAddStrapi.jsx":
/*!********************************!*\
  !*** ./src/PhotoAddStrapi.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoAddStrapi; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _services_httpService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/httpService */ "./src/services/httpService.js");
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! exif-js */ "exif-js");
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(exif_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/ai */ "react-icons/ai");
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_ai__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DateInput_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DateInput.jsx */ "./src/DateInput.jsx");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! exifr */ "exifr");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(exifr__WEBPACK_IMPORTED_MODULE_7__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */









var slugify = __webpack_require__(/*! slugify */ "slugify");

class PhotoAddStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();

    _defineProperty(this, "handleInputChange", e => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState(prevState => {
        const stateFields = { ...prevState,
          photo: { ...prevState.photo,
            [name]: value
          }
        };
        const invalidFields = { ...prevState.invalidFields
        };
        if (this.state.photo.title && this.state.invalidFields.title) delete invalidFields['title'];
        stateFields['invalidFields'] = invalidFields;
        return stateFields;
      });
    });

    _defineProperty(this, "removeImage", () => {
      console.log('remove');
      this.setState({
        tempFile: null,
        photo: {}
      });
    });

    _defineProperty(this, "handleOnDrop", e => {
      console.log('handleOnDrop fired', e);
    });

    _defineProperty(this, "handleOnDragOver", e => {
      this.setState({
        onDragOver: true
      });
    });

    _defineProperty(this, "handleOnDragLeave", e => {
      this.setState({
        onDragOver: false
      });
    });

    _defineProperty(this, "checkForAvailableSlug", async slug => {
      let query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
            }
        }`;
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        slug
      }, true);
      return result;
    });

    _defineProperty(this, "createSlug", async (slug, suffix) => {
      var result = await this.checkForAvailableSlug(slug);

      if (!result.photoBySlug) {
        // slug is available, proceed
        return slug;
      } else {
        // slug is not available, try again
        if (!suffix) {
          suffix = 1;
        } else {
          suffix++;
        }

        let adjustedSlug = slug + '-' + suffix;
        return this.createSlug(adjustedSlug, suffix);
      }
    });

    this.state = {
      photo: {},
      photoLoading: false,
      tempFile: null,
      onDrop: false,
      onDragOver: false,
      uploadPercentage: 0,
      invalidFields: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  async onFileChange(e) {
    const file = e.target.files[0];
    this.setState({
      blob: file
    });

    if (file.size > 27000000) {
      this.setState(prevState => ({ ...prevState,
        invalidFields: { ...prevState.invalidFields,
          photoImage: 'Selecteer een afbeelding kleiner dan 27MB.'
        }
      }));
      return;
    } else {
      this.setState(prevState => {
        const invalidFields = { ...prevState.invalidFields
        };
        if (invalidFields.hasOwnProperty("photoImage")) delete invalidFields['photoImage'];
        return {
          invalidFields
        };
      });
    }

    this.setState({
      photoLoading: true
    });
    var reader = new FileReader();

    reader.onload = () => {
      this.setState({
        photoLoading: false,
        tempFile: URL.createObjectURL(file)
      });
    };

    reader.readAsDataURL(file); // TODO: extract lensmodel, and write location suggestion
    // let exifrGps = await exifr.gps(file);
    // let output = await exifr.parse(file, ['LensModel']);
    // if (exifrGps) {
    //     let { longitude, latitude } = exifrGps;
    //     // this.setsate and get nearby locations to suggest
    // }
    // if (output) {
    //     //this.setstate lensmodel (24-70mm) 
    // }

    if (file && file.name) {
      exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getData(file, () => {
        let exifData = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.pretty(file);

        if (exifData && exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime") && exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ISOSpeedRatings") && exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FNumber")) {
          let date = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "DateTime");

          if (date) {
            let splittedDate = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "DateTime").substr(0, 10).split(":");
            const year = splittedDate[0];
            const month = splittedDate[1];
            const day = splittedDate[2];
            let dateVal = `${year}-${month}-${day}`;
            this.setState(prevState => ({ ...prevState,
              photo: { ...prevState.photo,
                date: dateVal
              }
            }));
          }

          console.log(exifData);
          let shutterspeedVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime") > 1 ? exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime") : '1/' + 1 / exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime");
          let ISOVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ISOSpeedRatings");
          let apertureVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FNumber").numerator / exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FNumber").denominator;
          let focalLengthVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FocalLength") + 'mm';
          let cameraVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "Model");
          this.setState(prevState => ({ ...prevState,
            photo: { ...prevState.photo,
              shutterspeed: shutterspeedVal,
              iso: ISOVal,
              aperture: apertureVal,
              focalLength: focalLengthVal,
              camera: cameraVal
            }
          }));
        } else {
          this.setState(prevState => ({ ...prevState,
            photo: { ...prevState.photo,
              date: '',
              shutterspeed: '',
              iso: '',
              aperture: '',
              focalLength: '',
              camera: ''
            }
          }));
        }
      });
    } else {
      this.setState(prevState => ({ ...prevState,
        photo: { ...prevState.photo,
          date: '',
          shutterspeed: '',
          iso: '',
          aperture: '',
          focalLength: '',
          camera: ''
        }
      }));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    const {
      photoImage,
      title
    } = this.state.photo; // check if an image is given, and title, if not show error and return null;

    if (!photoImage || !title) {
      if (!photoImage) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            photoImage: 'Voeg je nog een foto toe? 📸'
          }
        }));
      }

      if (!title) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            title: 'Wat is de titel van je foto? 📸'
          }
        }));
      }

      return;
    } // Progress


    const options = {
      onUploadProgress: progressEvent => {
        const {
          loaded,
          total
        } = progressEvent; // Do something with the progress details

        const progress = Math.floor(loaded / total * 100);

        if (progress < 100) {
          this.setState({
            uploadPercentage: progress
          });
        }
      }
    }; // check if slug is available, if not, add number

    let slug = slugify(title, {
      replacement: '-',
      // replace spaces with replacement character, defaults to `-`
      remove: undefined,
      // remove characters that match regex, defaults to `undefined`
      lower: true,
      // convert to lower case, defaults to `false`
      strict: true // strip special characters except replacement, defaults to `false`

    });
    const createdSlug = await this.createSlug(slug);
    this.setState(prevState => ({ ...prevState,
      photo: { ...prevState.photo,
        slug: createdSlug,
        date: prevState.photo.date ? new Date(prevState.photo.date) : null
      }
    })); // if slug is available, add to the query and create photo page with info

    const query = `mutation CreatePhoto($input: createPhotoInput) {
            createPhoto(input: $input){
                photo{
                    title
                    desc
                    slug
                    date
                    brand
                    shutterspeed
                    iso
                    aperture
                    camera
                    focalLength
                    id
                }
            }
        }`;
    let input = {};
    input['data'] = this.state.photo;
    console.log(input);
    delete input.data.photoImage;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      input
    }, true);

    if (data) {
      //after pages is created, use refId to upload files with xhr request
      console.log('photo created', data);
      const formData = new FormData();
      const uploadedFile = document.querySelector('#fileInput input').files[0];
      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append('ref', 'photo');
      formData.append('field', 'photo');
      formData.append('refId', data.createPhoto.photo.id);
      const request = new XMLHttpRequest();
      request.open('POST', `http://localhost:1337/upload`);
      request.send(formData); // add photo to form data
      // refId = data.createPhoto.photo.id
      // field = photo
      // ref = Photo
      // const formElement = document.querySelector('form');
      // formElement.addEventListener('submit', e => {
      //     e.preventDefault();
      //     const request = new XMLHttpRequest();
      //     request.open('POST', '/upload');
      //     request.send(new FormData(formElement));
    } else {
      console.log('failed');
    } // UPLOADTING THE IMAGE
    // const { data: resources } = await http.post(
    //     window.ENV.UI_API_IMAGE_ENDPOINT,
    //     formData,
    //     options
    // );
    //0 = thumb, 1 == watermakrk 2 == original
    // const imageThumb =
    //     "https://dkotwt30gflnm.cloudfront.net/" +
    //     resources.transforms.find(elem => elem.id === "thumbnail").key;
    // const imageOriginal =
    //     "https://dkotwt30gflnm.cloudfront.net/" +
    //     resources.transforms.find(elem => elem.id === "original").key;
    // const imageWatermark =
    //     "https://dkotwt30gflnm.cloudfront.net/" +
    //     resources.transforms.find(elem => elem.id === "watermark").key;
    // const photo = {
    //     title: form.title.value,
    //     //place: form.place.value,
    //     date: form.date.value ? new Date(form.date.value).toISOString() : null,
    //     description: form.desc.value,
    //     shutterspeed: form.shutterspeed.value,
    //     iso: form.iso.value,
    //     aperture: form.aperture.value,
    //     images: {
    //         imageThumb,
    //         imageOriginal,
    //         imageWatermark
    //     }
    // };
    // // {
    // //     "input" :{
    // //       "data": {
    // //           "title": "Test"
    // //         }
    // //     }
    // //   }
    // const data = await graphQLFetch(query, { input }, true);
    // if (data) {
    //     // set the state to 100, once the photo is loaded
    //     this.setState({ uploadPercentage: 100 });
    //     //console.log(data.photoAdd.id);
    //     // if the query returns an id in data, the photo is created
    //     // redirect to created photo
    //     const { id } = data.photoAdd;
    //     const { history } = this.props;
    //     history.push({
    //         pathname: `/photos/${id}`
    //     })
    // }

  }

  render() {
    const {
      date,
      shutterspeed,
      iso,
      aperture,
      camera,
      focalLength
    } = this.state.photo;
    const {
      photoLoading,
      tempFile
    } = this.state;
    let showInputClass = "relative border-2 border-dashed rounded mb-2 p-4 text-center cursor-pointer hover:border-green-500";
    showInputClass += !tempFile && !photoLoading ? ' block' : ' hidden';
    showInputClass += this.state.onDragOver && !this.state.invalidFields.photoImage ? " border-green-400" : " border-gray-400";
    if (this.state.invalidFields.photoImage) showInputClass += " border-red-400";
    let btnClass = "block px-3 py- my-2 text-white rounded text-l";
    let disabled = this.state.uploadPercentage || Object.keys(this.state.invalidFields).length > 0;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      name: "photoAdd",
      encType: "multipart/form-data",
      onSubmit: this.handleSubmit,
      onChange: this.handleInputChange,
      className: "block py-3 px-4 border border-gray-300 rounded"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "my-2 font-bold"
    }, "Starpi Foto toevoegen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "fileInput",
      className: showInputClass
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "file",
      name: "photoImage",
      ref: this.fileInput,
      onChange: this.onFileChange,
      onDrop: this.handleOnDrop,
      onDragOver: this.handleOnDragOver,
      onDragLeave: this.handleOnDragLeave,
      className: "absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-xl text-black font-semibold"
    }, "Drag en drop een afbeelding"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-base"
    }, " of ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, "selecteer"), " een bestand ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-sm block text-gray-300"
    }, " (Hoge resolutie aangeraden, maximaal 27MB)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-red-500"
    }, this.state.invalidFields.photoImage), photoLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_4__["AiOutlineLoading3Quarters"], {
      className: "fill-current text-green-500"
    }), tempFile && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "imagePreview",
      className: "relative relative bg-gray-300 p-4 mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.removeImage,
      className: "border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_5__["FiTrash2"], {
      className: "stroke-current text-gray-100"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: tempFile,
      id: "output_image",
      className: "max-w-full rounded mb-2"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Titel"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-red-500"
    }, this.state.invalidFields.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "date",
      name: "date",
      placeholder: "Datum",
      defaultValue: date || ""
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-wrap items-stretch w-full relative mb-2 mr-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "shutterspeed",
      placeholder: "Sluitertijd",
      defaultValue: shutterspeed || "",
      className: "mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-r-none py-2 px-3 relative text-sm"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex -mr-px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "flex items-center  bg-grey-lighter rounded rounded-l-none border border-l-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
    }, "s"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-wrap items-stretch w-full relative mb-2 mr-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex -mr-px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
    }, "iso")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "iso",
      placeholder: "iso",
      defaultValue: iso || "",
      className: "mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-wrap items-stretch w-full relative mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex -mr-px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
    }, "f/")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "aperture",
      placeholder: "Diafragma",
      defaultValue: aperture || "",
      className: "mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "camera",
      placeholder: "camera",
      defaultValue: camera || ""
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "focalLength",
      defaultValue: focalLength || "",
      placeholder: "focalLength"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      type: "text",
      name: "desc",
      placeholder: "Beschrijving"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: btnClass,
      disabled: disabled
    }, "Uploaden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "shadow w-full bg-grey-light"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "bg-blue-500 text-xs leading-none py-1 text-center text-white",
      style: {
        width: this.state.uploadPercentage + '%'
      }
    }, this.state.uploadPercentage + '%')));
  }

}

/***/ }),

/***/ "./src/PhotoCarousel.jsx":
/*!*******************************!*\
  !*** ./src/PhotoCarousel.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoCarousel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* globals React */


const PhotoView = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(({
  photo,
  location: {
    search
  },
  deletePhoto,
  index
}) => {
  const selectedLocation = {
    pathname: `/photos/${photo.id}`,
    search
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full inline-block md:w-1/2 lg:w-1/3 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoCard rounded relative shadow-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: () => {
      deletePhoto(index);
    },
    className: "deletePhotoTimes rounded-full overflow-hidden w-4 h-4 -top-1 hidden z-10 absolute bg-red-700"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: "w-4 h-4 stroke-current text-white stroke-2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative rounded overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: selectedLocation,
    className: "absolute w-full h-full z-10",
    title: "Bekijk foto nu"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: photo.images.imageWatermark,
    className: "object-cover  w-full h-48  block",
    alt: "Foto"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoContent p-4 absolute bottom-0 left-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-white"
  }, // convert date type to a readable date string
  photo.date && photo.date.toDateString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoInfo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-white"
  }, photo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-white"
  }, photo.place), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-white"
  }, photo.category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear"
  }))))));
});
function PhotoCarousel({
  photos,
  deletePhoto
}) {
  const photoViews = photos.map((photo, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PhotoView, {
    key: photo.id,
    index: index,
    deletePhoto: deletePhoto,
    photo: photo
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "-mx-2"
  }, photoViews);
}

/***/ }),

/***/ "./src/PhotoDetail.jsx":
/*!*****************************!*\
  !*** ./src/PhotoDetail.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* globals React */

/* eslint "react/jsx-no-undef":"off" */





class PhotoDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photo($id: Int!) {
        photo(id: $id) {
          id
          title
          date
          created
          description
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;
    let {
      params: {
        id
      }
    } = match;
    id = parseInt(id);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      id
    }, showError);
    return result;
  }

  constructor() {
    super();
    console.log(_store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData);
    const photo = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.photo : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      photo,
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
    console.log(this.state);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (prevId !== id) {
      this.loadData();
    }
  }

  componentDidMount() {
    const {
      photo
    } = this.state;

    if (photo === null) {
      this.loadData();
    }
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables 

    const data = await PhotoDetail.fetchData(match);

    if (data) {
      this.setState({
        photo: data.photo
      });
    }
  }

  render() {
    const {
      photo
    } = this.state;
    if (photo === null) return null;
    const {
      photo: {
        images: {
          imageWatermark
        }
      }
    } = this.state;
    const position = [this.state.lat, this.state.lng];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, photo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, photo.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: `/edit/${photo.id}`
    }, "Bewerken"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: imageWatermark,
      className: " w-full   block",
      alt: "Foto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
      className: "map",
      center: position,
      zoom: this.state.zoom
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: position
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "A pretty CSS3 popup. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " Easily customizable."))));
  }

}

/***/ }),

/***/ "./src/PhotoDetailStrapi.jsx":
/*!***********************************!*\
  !*** ./src/PhotoDetailStrapi.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoDetailStrapi; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__);
/* globals React */

/* eslint "react/jsx-no-undef":"off" */









class PhotoDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
                desc
                photo {
                    url
                }
                slug
                date
                brand
                shutterspeed
                iso
                aperture
                camera
                likes
                focalLength
                location {
                    longitude
                    latitude
                }
            }
        }`;
    let {
      params: {
        id: slug
      }
    } = match;
    console.log(match);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    return result;
  }

  constructor() {
    super();
    const photoBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.photoBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      photoBySlug,
      redirect: false,
      zoom: 13,
      userLocationKnown: false,
      userMarker: null,
      userLocation: {
        longitude: null,
        latitude: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (prevId !== id) {
      this.loadData();
    }
  }

  componentDidMount() {
    const {
      photoBySlug
    } = this.state;

    if (photoBySlug === null) {
      this.loadData();
    } // loading leaflet in componentDidMount because it doenst support SSR


    const L = __webpack_require__(/*! leaflet */ "leaflet");

    const userMarker = new L.Icon({
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    }); // get users position

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.setState(prevState => ({ ...prevState,
        userMarker,
        userLocationKnown: true,
        userLocation: {
          longitude: crd.longitude,
          latitude: crd.latitude
        }
      }));
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      fetch('https://ipapi.co/json').then(res => res.json()).then(location => {
        this.setState(prevState => ({ ...prevState,
          userMarker,
          userLocationKnown: true,
          userLocation: {
            longitude: location.longitude,
            latitude: location.latitude
          }
        }));
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables 

    const data = await PhotoDetailStrapi.fetchData(match);

    if (data.photoBySlug != null) {
      console.log('Setting state');
      this.setState({
        photoBySlug: data.photoBySlug
      });
      console.log(this.state);
    } else {
      console.log('return not found');
      this.setState({
        redirect: true
      });
      console.log(this.state);
    }
  }

  render() {
    const {
      photoBySlug,
      redirect
    } = this.state;

    if (redirect) {
      console.log('redirect', redirect);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/niet-gevonden"
      });
    }

    if (photoBySlug === null) {
      console.log('return null from render');
      return null;
    }

    const {
      userLocation,
      userLocationKnown,
      userMarker
    } = this.state;
    const position = [photoBySlug.location.longitude, photoBySlug.location.latitude];
    const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: photoBySlug.photo[0].url,
      className: " w-full   block",
      alt: "Foto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-2xl font-bold mb-1 text-gray-800 block"
    }, photoBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-gray-600"
    }, photoBySlug.desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
      className: "map",
      id: "photoLocation",
      center: position,
      zoom: this.state.zoom
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: position
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Foto locatie")), userLocationKnown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: calculatedUserLocation,
      icon: userMarker
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie")))));
  }

}

/***/ }),

/***/ "./src/PhotoEdit.jsx":
/*!***************************!*\
  !*** ./src/PhotoEdit.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _DateInput_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DateInput.jsx */ "./src/DateInput.jsx");
/* harmony import */ var _TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextInput.jsx */ "./src/TextInput.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */







class PhotoEdit extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photo($id: Int!) {
            photo(id: $id) {
              id
              title
              date
              created
              description
              ISO
              shutterspeed
              aperture
              images {
                imageThumb
                imageOriginal
                imageWatermark
              }
            }
          }`;
    let {
      params: {
        id
      }
    } = match;
    id = parseInt(id);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      id
    }, showError);
    return result;
  }

  constructor(props) {
    super(props); // when ssr the initialData is set, otherwise set to null

    _defineProperty(this, "handleSubmit", async e => {
      e.preventDefault();
      const {
        photo,
        invalidFields
      } = this.state;
      if (Object.keys(invalidFields).length !== 0) return;
      const query = `mutation issueUpdate(
            $id: Int!
            $changes: PhotoUpdateInputs!
        ) {
            photoUpdate(
                id: $id
                changes: $changes
            ) {
                id
                title
                date
                created
                description
                ISO
                shutterspeed
                aperture
                images {
                  imageThumb
                  imageOriginal
                  imageWatermark
                }
            }
        }`; // get the properties id and created from photo, and store the rest in changes

      const {
        id,
        created,
        ...changes
      } = photo;
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        changes,
        id
      });

      if (data) {
        this.setState({
          photo: data.photoUpdate
        });
        react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].success("Succesvol geudate");
      }
    });

    const _photo = _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData.photo : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData;
    this.state = {
      photo: _photo,
      invalidFields: {}
    };
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const {
      photo
    } = this.state;
    if (photo === null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (id !== prevId) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    // this function gets called by child compontent, if the valid value changed
    // from valid to nonvalid or other way around
    // get the name of the input
    const {
      name
    } = event.target; // update the state, by overriding the new valid state

    this.setState(prevState => {
      const invalidFields = { ...prevState.invalidFields,
        [name]: !valid
      }; // if valid is true, delete the inputfield from the state

      if (valid) delete invalidFields[name]; // update the state with the new invalid fields

      return {
        invalidFields
      };
    });
  }

  onChange(e, naturalValue) {
    const {
      name,
      value: textValue
    } = e.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      // to only update values that changed, list out all of the previous values
      // with ...prevState.photo and override the changed ones with [name]: value
      photo: { ...prevState.photo,
        [name]: value
      }
    }));
  }

  async loadData() {
    const {
      match
    } = this.props;
    const data = await PhotoEdit.fetchData(match);

    if (data) {
      const {
        photo
      } = data;
      data.created = data.created ? data.created.toDateString() : '';
      data.date = data.date ? data.date.toDateString() : '';
      this.setState({
        photo,
        invalidFields: {}
      });
    } else {
      this.setState({
        photo: {},
        invalidFields: {}
      });
    }
  }

  render() {
    const {
      photo
    } = this.state;
    if (photo === null) return null; // get photo ID from state

    const {
      photo: {
        id
      }
    } = this.state; // get photo ID form url

    const {
      match: {
        params: {
          id: propsId
        }
      }
    } = this.props; // check if state has a photo

    if (id === null) {
      // if not, but url has an id, the photo is not found
      if (propsId != null) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Foto met ID ${propsId} niet gevonden.`);
      } // if no id is supplied, return null


      return null;
    }

    const {
      photo: {
        images: {
          imageWatermark
        }
      }
    } = this.state;
    const {
      invalidFields
    } = this.state;
    let validationMessage;

    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "error"
      }, "\uD83E\uDD14Heb je alle velden goed ingevuld?");
    }

    let btnClass = "block px-3 py- my-2 text-white rounded text-l";
    let disabled = Object.keys(invalidFields).length !== 0;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Bewerk foto ${photo.title}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: photo.images.imageWatermark,
      className: "object-cover w-full h-48 block",
      alt: "Foto",
      id: "replacePhoto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "title"
    }, "Titel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "title",
      name: "title",
      type: "text",
      value: photo.title,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "date"
    }, "Datum"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateInput_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "date",
      value: photo.date,
      onChange: this.onChange,
      onValidityChange: this.onValidityChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "shutterspeed"
    }, "Sluitertijd"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "shutterspeed",
      name: "shutterspeed",
      type: "text",
      value: photo.shutterspeed,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "shutterspeed"
    }, "ISO"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "ISO",
      name: "ISO",
      type: "text",
      value: photo.ISO,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "aperture"
    }, "Diafragma"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "aperture",
      name: "aperture",
      type: "text",
      value: photo.aperture,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "description"
    }, "Beschrijving"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TextInput_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      tag: "textarea",
      id: "description",
      name: "description",
      type: "text",
      value: photo.description,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "submit",
      className: btnClass
    }, "Opslaan"), validationMessage);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PhotoEdit);

/***/ }),

/***/ "./src/PhotoFilter.jsx":
/*!*****************************!*\
  !*** ./src/PhotoFilter.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_2__);
/* globals React */




class PhotoFilter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor({
    location: {
      search
    }
  }) {
    super();
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_2___default.a(search);
    this.state = {
      category: params.get('category') || ''
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    //     console.log('prevProps', prevProps.location.search);
    //     console.log('thisProps', this.props.location.search);
    const {
      location: {
        search: prevSearch
      }
    } = prevProps;
    const {
      location: {
        search
      }
    } = this.props;

    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    this.setState({
      category: e.target.value
    });
  }

  showOriginalFilter() {
    const {
      location: {
        search
      }
    } = this.props;
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_2___default.a(search);
    this.setState({
      category: params.get('category') || ''
    });
  }

  applyFilter() {
    // get the filter, in this case the category
    const {
      category
    } = this.state; // get the history prop to use the history.push function 
    // to use history, we need to export PhotoFilter withRouter() as done at last rule

    const {
      history
    } = this.props;
    history.push({
      pathname: '/photos',
      search: category ? `?category=${category}` : ``
    });
  }

  render() {
    // get the location search to display current filter in select
    const {
      category
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Category:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      value: category,
      onChange: this.onChangeStatus
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, "Alle photos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "landschapsfotografie"
    }, "Landschapsfotografie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "nabewerking"
    }, "nabewerking"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "photowalk"
    }, "photowalk"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "nachtfotografie"
    }, "nachtfotografie")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      onClick: this.applyFilter
    }, "Apply"));
  }

} //because we need access to the this.props.history property, we use withRouter


/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(PhotoFilter));

/***/ }),

/***/ "./src/PhotoList.jsx":
/*!***************************!*\
  !*** ./src/PhotoList.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PhotoFilter_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoFilter.jsx */ "./src/PhotoFilter.jsx");
/* harmony import */ var _PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoCarousel.jsx */ "./src/PhotoCarousel.jsx");
/* harmony import */ var _PhotoDetail_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoDetail.jsx */ "./src/PhotoDetail.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */

/* eslint "react/jsx-no-undef":"off" */






/* to support IE */



class PhotoList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search) {
    // get the search query string form url
    //const { location: { search } } = this.props;
    // use URLSearchParams for IE Compatibility
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_6___default.a(search); // If category is provided in the query string, add them to our variables 

    const vars = {};
    if (params.get('category')) vars.category = params.get('category'); // build the graphql query

    const query = `query photoList($category: String) {
        photoList(category: $category) {
          id
          title
          date
          created
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`; // provide the query with the variables 

    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars);
    return data;
  }

  constructor() {
    const _photos = _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData.photoList : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData;
    super();

    _defineProperty(this, "deletePhoto", async index => {
      const query = `mutation photoDelete($id: Int!) {
            photoDelete(id: $id)
        }`;
      const {
        photos
      } = this.state;
      const {
        location: {
          pathname,
          search
        },
        history
      } = this.props;
      const {
        id
      } = photos[index];
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
        id
      });

      if (data && data.photoDelete) {
        this.setState(prevState => {
          const newList = [...prevState.photos];

          if (pathname === `/photos/${id}`) {
            history.push({
              pathname: '/photos',
              search
            });
          }

          newList.splice(index, 1);
          return {
            photos: newList
          };
        });
      } else {
        this.loadData();
      }
    });

    this.state = {
      photos: _photos
    };
  }

  componentDidUpdate(prevProps) {
    const {
      location: {
        search: prevSearch
      }
    } = prevProps;
    const {
      location: {
        search
      }
    } = this.props;

    if (prevSearch !== search) {
      this.loadData();
    }
  }

  componentDidMount() {
    const {
      photos
    } = this.state;
    if (photos === null) this.loadData();
  }

  async loadData() {
    // get the search query string form url
    const {
      location: {
        search
      }
    } = this.props; // fetch data

    const data = await PhotoList.fetchData(null, search);

    if (data) {
      this.setState({
        photos: data.photoList
      });
    }
  }

  render() {
    const {
      photos
    } = this.state;
    if (photos === null) return null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Recente foto's"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoFilter_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      photos: photos,
      deletePhoto: this.deletePhoto
    }));
  }

}

/***/ }),

/***/ "./src/PhotoReport.jsx":
/*!*****************************!*\
  !*** ./src/PhotoReport.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoReport; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // eslint-disable-next-line react/prefer-stateless-function

function PhotoReport() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "This is a placholder for the PhotoReport"));
}

/***/ }),

/***/ "./src/TextInput.jsx":
/*!***************************!*\
  !*** ./src/TextInput.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function format(text) {
  return text != null ? text : '';
}

function unformat(text) {
  return text.trim().length === 0 ? null : text;
}

class TextInput extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      value: format(props.value)
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onBlur(e) {
    const {
      onChange
    } = this.props;
    const {
      value
    } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const {
      value
    } = this.state;
    const {
      tag = 'input',
      ...props
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tag, { ...props,
      value,
      onBlur: this.onBlur,
      onChange: this.onChange
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TextInput);

/***/ }),

/***/ "./src/graphQLFetch.js":
/*!*****************************!*\
  !*** ./src/graphQLFetch.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return graphQLFetch; });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__);


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}, isBlog = false) {
  //console.log('query from graphQlFetch ' + query)
  let apiEndpoint =  false ? // eslint-disable-line no-undef
  undefined : process.env.UI_SERVER_API_ENDPOINT;
  apiEndpoint = isBlog ? 'http://localhost:1337/graphql' : apiEndpoint;

  try {
    const response = await isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default()(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver); // alert the error message whenthe result is containing erros

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code == "BAD_USER_INPUT") {
        console.log(error);
        const details = error.extensions.exception.errors.join("\n ");
        react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`${error.message}\n ${details}`);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`${error.extensions.code}\n ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`Error in sending data to server: ${e.message}`);
  }
}

/***/ }),

/***/ "./src/images/locationMarker.svg":
/*!***************************************!*\
  !*** ./src/images/locationMarker.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 28.5 35.78\"><defs><style>.cls-1{fill:#9af43b;}.cls-1,.cls-2,.cls-3{stroke:#54596e;stroke-miterlimit:10;}.cls-1,.cls-2{stroke-width:2px;}.cls-2{fill:none;}.cls-3{fill:#fff;}.cls-4{fill:#ff927d;}</style></defs><title>Asset 6</title><g id=\"Layer_2\" data-name=\"Layer 2\"><g id=\"Layer_2_copy\" data-name=\"Layer 2 copy\"><path class=\"cls-1\" d=\"M14.25,1C10.56.79,1,3.83,1,13.39S14.25,34.46,14.25,34.46,27.5,23,27.5,13.39,17.94.79,14.25,1Z\"/><path class=\"cls-2\" d=\"M8.82,15.81s4.34,4.13,10.86,0\"/><line class=\"cls-3\" x1=\"21.93\" y1=\"8.99\" x2=\"21.93\" y2=\"11.44\"/><line class=\"cls-3\" x1=\"20.47\" y1=\"10.21\" x2=\"23.32\" y2=\"10.21\"/><line class=\"cls-3\" x1=\"6.86\" y1=\"8.99\" x2=\"6.86\" y2=\"11.44\"/><line class=\"cls-3\" x1=\"5.4\" y1=\"10.21\" x2=\"8.25\" y2=\"10.21\"/><g id=\"Layer_3_copy\" data-name=\"Layer 3 copy\"><circle class=\"cls-4\" cx=\"5.58\" cy=\"13.66\" r=\"1.89\"/><circle class=\"cls-4\" cx=\"23.32\" cy=\"13.66\" r=\"1.89\"/></g></g></g></svg>");

/***/ }),

/***/ "./src/images/markerShadow.png":
/*!*************************************!*\
  !*** ./src/images/markerShadow.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n(Source code omitted for this binary file)");

/***/ }),

/***/ "./src/images/userMarker.svg":
/*!***********************************!*\
  !*** ./src/images/userMarker.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 28.5 35.78\"><defs><style>.cls-1{fill:#fff35f;}.cls-1,.cls-2,.cls-3{stroke:#54596e;stroke-miterlimit:10;}.cls-1,.cls-2{stroke-width:2px;}.cls-2{fill:none;}.cls-3{fill:#fff;}.cls-4{fill:#ff927d;}</style></defs><title>Asset 7</title><g id=\"Layer_2\" data-name=\"Layer 2\"><g id=\"Layer_2-2\" data-name=\"Layer 2\"><path class=\"cls-1\" d=\"M14.25,1C10.56.79,1,3.83,1,13.39S14.25,34.46,14.25,34.46,27.5,23,27.5,13.39,17.94.79,14.25,1Z\"/><path class=\"cls-2\" d=\"M8.82,15.81s4.34,4.13,10.86,0\"/><line class=\"cls-3\" x1=\"21.93\" y1=\"8.99\" x2=\"21.93\" y2=\"11.44\"/><line class=\"cls-3\" x1=\"20.47\" y1=\"10.21\" x2=\"23.32\" y2=\"10.21\"/><line class=\"cls-3\" x1=\"6.86\" y1=\"8.99\" x2=\"6.86\" y2=\"11.44\"/><line class=\"cls-3\" x1=\"5.4\" y1=\"10.21\" x2=\"8.25\" y2=\"10.21\"/><g id=\"Layer_3\" data-name=\"Layer 3\"><circle class=\"cls-4\" cx=\"5.58\" cy=\"13.66\" r=\"1.89\"/><circle class=\"cls-4\" cx=\"23.32\" cy=\"13.66\" r=\"1.89\"/></g></g></g></svg>");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoList_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoList.jsx */ "./src/PhotoList.jsx");
/* harmony import */ var _PhotoReport_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoReport.jsx */ "./src/PhotoReport.jsx");
/* harmony import */ var _PhotoEdit_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoEdit.jsx */ "./src/PhotoEdit.jsx");
/* harmony import */ var _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoDetailStrapi.jsx */ "./src/PhotoDetailStrapi.jsx");
/* harmony import */ var _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LocationDetailStrapi.jsx */ "./src/LocationDetailStrapi.jsx");
/* harmony import */ var _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PhotoAddStrapi.jsx */ "./src/PhotoAddStrapi.jsx");
/* harmony import */ var _About_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./About.jsx */ "./src/About.jsx");
/* harmony import */ var _NotFound_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NotFound.jsx */ "./src/NotFound.jsx");
/* harmony import */ var _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BlogPost.jsx */ "./src/BlogPost.jsx");









const routes = [{
  path: '/foto/toevoegen',
  component: _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
  exact: true
}, {
  path: '/foto/:id',
  component: _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_3__["default"],
  strict: true
}, {
  path: '/fotolocatie/:id',
  component: _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_4__["default"],
  strict: true
}, {
  path: '/fotos',
  component: _PhotoList_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  path: '/bewerken/:id',
  component: _PhotoEdit_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  path: '/report',
  component: _PhotoReport_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]
}, {
  path: '/about',
  component: _About_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]
}, {
  path: '/niet-gevonden',
  component: _NotFound_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
  exact: true
}, {
  path: '/*',
  component: _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/services/httpService.js":
/*!*************************************!*\
  !*** ./src/services/httpService.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.response.use(null, error => {
  const expextedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expextedError) {
    console.log("Logging the error", error);
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  get: axios__WEBPACK_IMPORTED_MODULE_0___default.a.get,
  post: axios__WEBPACK_IMPORTED_MODULE_0___default.a.post,
  put: axios__WEBPACK_IMPORTED_MODULE_0___default.a.put,
  delete: axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete
});

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const store = {};
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ "path");

const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");

const webpack = __webpack_require__(/*! webpack */ "webpack");

const browserConfig = {
  mode: 'development',
  entry: {
    app: ['./browser/App.jsx']
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [// Creates `style` nodes from JS strings
      "style-loader", // Translates CSS into CommonJS
      "css-loader", {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [__webpack_require__(/*! tailwindcss */ "tailwindcss"), __webpack_require__(/*! autoprefixer */ "autoprefixer")]
        }
      }, // Compiles Sass to CSS
      "sass-loader"]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            targets: {
              ie: '11',
              edge: '15',
              safari: '10',
              firefox: '50',
              chrome: '49'
            }
          }], '@babel/preset-react'],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [{
        loader: 'file-loader'
      }]
    }]
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  },
  plugins: [new webpack.DefinePlugin({
    __isBrowser__: 'true'
  })],
  devtool: 'source-map'
};
const serverConfig = {
  mode: 'development',
  entry: {
    server: ['./server/uiserver.js']
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            targets: {
              node: '10'
            }
          }], '@babel/preset-react'],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [{
        loader: 'file-loader'
      }]
    }]
  },
  plugins: [new webpack.DefinePlugin({
    __isBrowser__: 'false'
  })],
  devtool: 'source-map'
};
module.exports = [browserConfig, serverConfig];
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ 0:
/*!***********************************************************************!*\
  !*** multi ./server/uiserver.js ./node_modules/webpack/hot/poll?1000 ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./server/uiserver.js */"./server/uiserver.js");
module.exports = __webpack_require__(/*! ./node_modules/webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");


/***/ }),

/***/ "autoprefixer":
/*!*******************************!*\
  !*** external "autoprefixer" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("autoprefixer");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "exif-js":
/*!**************************!*\
  !*** external "exif-js" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("exif-js");

/***/ }),

/***/ "exifr":
/*!************************!*\
  !*** external "exifr" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("exifr");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http-proxy-middleware":
/*!****************************************!*\
  !*** external "http-proxy-middleware" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "leaflet":
/*!**************************!*\
  !*** external "leaflet" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("leaflet");

/***/ }),

/***/ "leaflet/dist/images/marker-shadow.png":
/*!********************************************************!*\
  !*** external "leaflet/dist/images/marker-shadow.png" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("leaflet/dist/images/marker-shadow.png");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-icons/ai":
/*!*********************************!*\
  !*** external "react-icons/ai" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/ai");

/***/ }),

/***/ "react-icons/fi":
/*!*********************************!*\
  !*** external "react-icons/fi" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/fi");

/***/ }),

/***/ "react-leaflet-universal":
/*!******************************************!*\
  !*** external "react-leaflet-universal" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-leaflet-universal");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "slugify":
/*!**************************!*\
  !*** external "slugify" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),

/***/ "tailwindcss":
/*!******************************!*\
  !*** external "tailwindcss" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tailwindcss");

/***/ }),

/***/ "url-search-params":
/*!************************************!*\
  !*** external "url-search-params" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-search-params");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map