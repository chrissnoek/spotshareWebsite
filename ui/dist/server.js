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
/******/ 	var hotCurrentHash = "ed38d289a927cd2d44de";
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

/***/ "./node_modules/@hapi/address/lib/domain.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/address/lib/domain.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Url = __webpack_require__(/*! url */ "url");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/address/lib/errors.js");

const internals = {
  minDomainSegments: 2,
  nonAsciiRx: /[^\x00-\x7f]/,
  domainControlRx: /[\x00-\x20@\:\/]/,
  // Control + space + separators
  tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
  domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
  URL: Url.URL || URL // $lab:coverage:ignore$

};

exports.analyze = function (domain, options = {}) {
  if (typeof domain !== 'string') {
    throw new Error('Invalid input: domain must be a string');
  }

  if (!domain) {
    return Errors.code('DOMAIN_NON_EMPTY_STRING');
  }

  if (domain.length > 256) {
    return Errors.code('DOMAIN_TOO_LONG');
  }

  const ascii = !internals.nonAsciiRx.test(domain);

  if (!ascii) {
    if (options.allowUnicode === false) {
      // Defaults to true
      return Errors.code('DOMAIN_INVALID_UNICODE_CHARS');
    }

    domain = domain.normalize('NFC');
  }

  if (internals.domainControlRx.test(domain)) {
    return Errors.code('DOMAIN_INVALID_CHARS');
  }

  domain = internals.punycode(domain); // https://tools.ietf.org/html/rfc1035 section 2.3.1

  const minDomainSegments = options.minDomainSegments || internals.minDomainSegments;
  const segments = domain.split('.');

  if (segments.length < minDomainSegments) {
    return Errors.code('DOMAIN_SEGMENTS_COUNT');
  }

  const tlds = options.tlds;

  if (tlds) {
    const tld = segments[segments.length - 1].toLowerCase();

    if (tlds.deny && tlds.deny.has(tld) || tlds.allow && !tlds.allow.has(tld)) {
      return Errors.code('DOMAIN_FORBIDDEN_TLDS');
    }
  }

  for (let i = 0; i < segments.length; ++i) {
    const segment = segments[i];

    if (!segment.length) {
      return Errors.code('DOMAIN_EMPTY_SEGMENT');
    }

    if (segment.length > 63) {
      return Errors.code('DOMAIN_LONG_SEGMENT');
    }

    if (i < segments.length - 1) {
      if (!internals.domainSegmentRx.test(segment)) {
        return Errors.code('DOMAIN_INVALID_CHARS');
      }
    } else {
      if (!internals.tldSegmentRx.test(segment)) {
        return Errors.code('DOMAIN_INVALID_TLDS_CHARS');
      }
    }
  }

  return null;
};

exports.isValid = function (domain, options) {
  return !exports.analyze(domain, options);
};

internals.punycode = function (domain) {
  try {
    return new internals.URL(`http://${domain}`).host;
  } catch (err) {
    return domain;
  }
};

/***/ }),

/***/ "./node_modules/@hapi/address/lib/email.js":
/*!*************************************************!*\
  !*** ./node_modules/@hapi/address/lib/email.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Util = __webpack_require__(/*! util */ "util");

const Domain = __webpack_require__(/*! ./domain */ "./node_modules/@hapi/address/lib/domain.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/address/lib/errors.js");

const internals = {
  nonAsciiRx: /[^\x00-\x7f]/,
  encoder: new (Util.TextEncoder || TextEncoder)() // $lab:coverage:ignore$

};

exports.analyze = function (email, options) {
  return internals.email(email, options);
};

exports.isValid = function (email, options) {
  return !internals.email(email, options);
};

internals.email = function (email, options = {}) {
  if (typeof email !== 'string') {
    throw new Error('Invalid input: email must be a string');
  }

  if (!email) {
    return Errors.code('EMPTY_STRING');
  } // Unicode


  const ascii = !internals.nonAsciiRx.test(email);

  if (!ascii) {
    if (options.allowUnicode === false) {
      // Defaults to true
      return Errors.code('FORBIDDEN_UNICODE');
    }

    email = email.normalize('NFC');
  } // Basic structure


  const parts = email.split('@');

  if (parts.length !== 2) {
    return parts.length > 2 ? Errors.code('MULTIPLE_AT_CHAR') : Errors.code('MISSING_AT_CHAR');
  }

  const [local, domain] = parts;

  if (!local) {
    return Errors.code('EMPTY_LOCAL');
  }

  if (!options.ignoreLength) {
    if (email.length > 254) {
      // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
      return Errors.code('ADDRESS_TOO_LONG');
    }

    if (internals.encoder.encode(local).length > 64) {
      // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
      return Errors.code('LOCAL_TOO_LONG');
    }
  } // Validate parts


  return internals.local(local, ascii) || Domain.analyze(domain, options);
};

internals.local = function (local, ascii) {
  const segments = local.split('.');

  for (const segment of segments) {
    if (!segment.length) {
      return Errors.code('EMPTY_LOCAL_SEGMENT');
    }

    if (ascii) {
      if (!internals.atextRx.test(segment)) {
        return Errors.code('INVALID_LOCAL_CHARS');
      }

      continue;
    }

    for (const char of segment) {
      if (internals.atextRx.test(char)) {
        continue;
      }

      const binary = internals.binary(char);

      if (!internals.atomRx.test(binary)) {
        return Errors.code('INVALID_LOCAL_CHARS');
      }
    }
  }
};

internals.binary = function (char) {
  return Array.from(internals.encoder.encode(char)).map(v => String.fromCharCode(v)).join('');
};
/*
    From RFC 5321:

        Mailbox         =   Local-part "@" ( Domain / address-literal )

        Local-part      =   Dot-string / Quoted-string
        Dot-string      =   Atom *("."  Atom)
        Atom            =   1*atext
        atext           =   ALPHA / DIGIT / "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "/" / "=" / "?" / "^" / "_" / "`" / "{" / "|" / "}" / "~"

        Domain          =   sub-domain *("." sub-domain)
        sub-domain      =   Let-dig [Ldh-str]
        Let-dig         =   ALPHA / DIGIT
        Ldh-str         =   *( ALPHA / DIGIT / "-" ) Let-dig

        ALPHA           =   %x41-5A / %x61-7A        ; a-z, A-Z
        DIGIT           =   %x30-39                  ; 0-9

    From RFC 6531:

        sub-domain      =/  U-label
        atext           =/  UTF8-non-ascii

        UTF8-non-ascii  =   UTF8-2 / UTF8-3 / UTF8-4

        UTF8-2          =   %xC2-DF UTF8-tail
        UTF8-3          =   %xE0 %xA0-BF UTF8-tail /
                            %xE1-EC 2( UTF8-tail ) /
                            %xED %x80-9F UTF8-tail /
                            %xEE-EF 2( UTF8-tail )
        UTF8-4          =   %xF0 %x90-BF 2( UTF8-tail ) /
                            %xF1-F3 3( UTF8-tail ) /
                            %xF4 %x80-8F 2( UTF8-tail )

        UTF8-tail       =   %x80-BF

    Note: The following are not supported:

        RFC 5321: address-literal, Quoted-string
        RFC 5322: obs-*, CFWS
*/


internals.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/; // _ included in \w

internals.atomRx = new RegExp([//  %xC2-DF UTF8-tail
'(?:[\\xc2-\\xdf][\\x80-\\xbf])', //  %xE0 %xA0-BF UTF8-tail              %xE1-EC 2( UTF8-tail )            %xED %x80-9F UTF8-tail              %xEE-EF 2( UTF8-tail )
'(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})', //  %xF0 %x90-BF 2( UTF8-tail )            %xF1-F3 3( UTF8-tail )            %xF4 %x80-8F 2( UTF8-tail )
'(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'].join('|'));

/***/ }),

/***/ "./node_modules/@hapi/address/lib/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/address/lib/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.codes = {
  EMPTY_STRING: 'Address must be a non-empty string',
  FORBIDDEN_UNICODE: 'Address contains forbidden Unicode characters',
  MULTIPLE_AT_CHAR: 'Address cannot contain more than one @ character',
  MISSING_AT_CHAR: 'Address must contain one @ character',
  EMPTY_LOCAL: 'Address local part cannot be empty',
  ADDRESS_TOO_LONG: 'Address too long',
  LOCAL_TOO_LONG: 'Address local part too long',
  EMPTY_LOCAL_SEGMENT: 'Address local part contains empty dot-separated segment',
  INVALID_LOCAL_CHARS: 'Address local part contains invalid character',
  DOMAIN_NON_EMPTY_STRING: 'Domain must be a non-empty string',
  DOMAIN_TOO_LONG: 'Domain too long',
  DOMAIN_INVALID_UNICODE_CHARS: 'Domain contains forbidden Unicode characters',
  DOMAIN_INVALID_CHARS: 'Domain contains invalid character',
  DOMAIN_INVALID_TLDS_CHARS: 'Domain contains invalid tld character',
  DOMAIN_SEGMENTS_COUNT: 'Domain lacks the minimum required number of segments',
  DOMAIN_FORBIDDEN_TLDS: 'Domain uses forbidden TLD',
  DOMAIN_EMPTY_SEGMENT: 'Domain contains empty dot-separated segment',
  DOMAIN_LONG_SEGMENT: 'Domain contains dot-separated segment that is too long'
};

exports.code = function (code) {
  return {
    code,
    error: exports.codes[code]
  };
};

/***/ }),

/***/ "./node_modules/@hapi/address/lib/ip.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/address/lib/ip.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Uri = __webpack_require__(/*! ./uri */ "./node_modules/@hapi/address/lib/uri.js");

const internals = {};

exports.regex = function (options = {}) {
  // CIDR
  Assert(options.cidr === undefined || typeof options.cidr === 'string', 'options.cidr must be a string');
  const cidr = options.cidr ? options.cidr.toLowerCase() : 'optional';
  Assert(['required', 'optional', 'forbidden'].includes(cidr), 'options.cidr must be one of required, optional, forbidden'); // Versions

  Assert(options.version === undefined || typeof options.version === 'string' || Array.isArray(options.version), 'options.version must be a string or an array of string');
  let versions = options.version || ['ipv4', 'ipv6', 'ipvfuture'];

  if (!Array.isArray(versions)) {
    versions = [versions];
  }

  Assert(versions.length >= 1, 'options.version must have at least 1 version specified');

  for (let i = 0; i < versions.length; ++i) {
    Assert(typeof versions[i] === 'string', 'options.version must only contain strings');
    versions[i] = versions[i].toLowerCase();
    Assert(['ipv4', 'ipv6', 'ipvfuture'].includes(versions[i]), 'options.version contains unknown version ' + versions[i] + ' - must be one of ipv4, ipv6, ipvfuture');
  }

  versions = Array.from(new Set(versions)); // Regex

  const parts = versions.map(version => {
    // Forbidden
    if (cidr === 'forbidden') {
      return Uri.ip[version];
    } // Required


    const cidrpart = `\\/${version === 'ipv4' ? Uri.ip.v4Cidr : Uri.ip.v6Cidr}`;

    if (cidr === 'required') {
      return `${Uri.ip[version]}${cidrpart}`;
    } // Optional


    return `${Uri.ip[version]}(?:${cidrpart})?`;
  });
  const raw = `(?:${parts.join('|')})`;
  const regex = new RegExp(`^${raw}$`);
  return {
    cidr,
    versions,
    regex,
    raw
  };
};

/***/ }),

/***/ "./node_modules/@hapi/address/lib/tlds.js":
/*!************************************************!*\
  !*** ./node_modules/@hapi/address/lib/tlds.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {}; // http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// # Version 2019091902, Last Updated Fri Sep 20 07: 07: 02 2019 UTC

internals.tlds = ['AAA', 'AARP', 'ABARTH', 'ABB', 'ABBOTT', 'ABBVIE', 'ABC', 'ABLE', 'ABOGADO', 'ABUDHABI', 'AC', 'ACADEMY', 'ACCENTURE', 'ACCOUNTANT', 'ACCOUNTANTS', 'ACO', 'ACTOR', 'AD', 'ADAC', 'ADS', 'ADULT', 'AE', 'AEG', 'AERO', 'AETNA', 'AF', 'AFAMILYCOMPANY', 'AFL', 'AFRICA', 'AG', 'AGAKHAN', 'AGENCY', 'AI', 'AIG', 'AIGO', 'AIRBUS', 'AIRFORCE', 'AIRTEL', 'AKDN', 'AL', 'ALFAROMEO', 'ALIBABA', 'ALIPAY', 'ALLFINANZ', 'ALLSTATE', 'ALLY', 'ALSACE', 'ALSTOM', 'AM', 'AMERICANEXPRESS', 'AMERICANFAMILY', 'AMEX', 'AMFAM', 'AMICA', 'AMSTERDAM', 'ANALYTICS', 'ANDROID', 'ANQUAN', 'ANZ', 'AO', 'AOL', 'APARTMENTS', 'APP', 'APPLE', 'AQ', 'AQUARELLE', 'AR', 'ARAB', 'ARAMCO', 'ARCHI', 'ARMY', 'ARPA', 'ART', 'ARTE', 'AS', 'ASDA', 'ASIA', 'ASSOCIATES', 'AT', 'ATHLETA', 'ATTORNEY', 'AU', 'AUCTION', 'AUDI', 'AUDIBLE', 'AUDIO', 'AUSPOST', 'AUTHOR', 'AUTO', 'AUTOS', 'AVIANCA', 'AW', 'AWS', 'AX', 'AXA', 'AZ', 'AZURE', 'BA', 'BABY', 'BAIDU', 'BANAMEX', 'BANANAREPUBLIC', 'BAND', 'BANK', 'BAR', 'BARCELONA', 'BARCLAYCARD', 'BARCLAYS', 'BAREFOOT', 'BARGAINS', 'BASEBALL', 'BASKETBALL', 'BAUHAUS', 'BAYERN', 'BB', 'BBC', 'BBT', 'BBVA', 'BCG', 'BCN', 'BD', 'BE', 'BEATS', 'BEAUTY', 'BEER', 'BENTLEY', 'BERLIN', 'BEST', 'BESTBUY', 'BET', 'BF', 'BG', 'BH', 'BHARTI', 'BI', 'BIBLE', 'BID', 'BIKE', 'BING', 'BINGO', 'BIO', 'BIZ', 'BJ', 'BLACK', 'BLACKFRIDAY', 'BLOCKBUSTER', 'BLOG', 'BLOOMBERG', 'BLUE', 'BM', 'BMS', 'BMW', 'BN', 'BNPPARIBAS', 'BO', 'BOATS', 'BOEHRINGER', 'BOFA', 'BOM', 'BOND', 'BOO', 'BOOK', 'BOOKING', 'BOSCH', 'BOSTIK', 'BOSTON', 'BOT', 'BOUTIQUE', 'BOX', 'BR', 'BRADESCO', 'BRIDGESTONE', 'BROADWAY', 'BROKER', 'BROTHER', 'BRUSSELS', 'BS', 'BT', 'BUDAPEST', 'BUGATTI', 'BUILD', 'BUILDERS', 'BUSINESS', 'BUY', 'BUZZ', 'BV', 'BW', 'BY', 'BZ', 'BZH', 'CA', 'CAB', 'CAFE', 'CAL', 'CALL', 'CALVINKLEIN', 'CAM', 'CAMERA', 'CAMP', 'CANCERRESEARCH', 'CANON', 'CAPETOWN', 'CAPITAL', 'CAPITALONE', 'CAR', 'CARAVAN', 'CARDS', 'CARE', 'CAREER', 'CAREERS', 'CARS', 'CARTIER', 'CASA', 'CASE', 'CASEIH', 'CASH', 'CASINO', 'CAT', 'CATERING', 'CATHOLIC', 'CBA', 'CBN', 'CBRE', 'CBS', 'CC', 'CD', 'CEB', 'CENTER', 'CEO', 'CERN', 'CF', 'CFA', 'CFD', 'CG', 'CH', 'CHANEL', 'CHANNEL', 'CHARITY', 'CHASE', 'CHAT', 'CHEAP', 'CHINTAI', 'CHRISTMAS', 'CHROME', 'CHRYSLER', 'CHURCH', 'CI', 'CIPRIANI', 'CIRCLE', 'CISCO', 'CITADEL', 'CITI', 'CITIC', 'CITY', 'CITYEATS', 'CK', 'CL', 'CLAIMS', 'CLEANING', 'CLICK', 'CLINIC', 'CLINIQUE', 'CLOTHING', 'CLOUD', 'CLUB', 'CLUBMED', 'CM', 'CN', 'CO', 'COACH', 'CODES', 'COFFEE', 'COLLEGE', 'COLOGNE', 'COM', 'COMCAST', 'COMMBANK', 'COMMUNITY', 'COMPANY', 'COMPARE', 'COMPUTER', 'COMSEC', 'CONDOS', 'CONSTRUCTION', 'CONSULTING', 'CONTACT', 'CONTRACTORS', 'COOKING', 'COOKINGCHANNEL', 'COOL', 'COOP', 'CORSICA', 'COUNTRY', 'COUPON', 'COUPONS', 'COURSES', 'CR', 'CREDIT', 'CREDITCARD', 'CREDITUNION', 'CRICKET', 'CROWN', 'CRS', 'CRUISE', 'CRUISES', 'CSC', 'CU', 'CUISINELLA', 'CV', 'CW', 'CX', 'CY', 'CYMRU', 'CYOU', 'CZ', 'DABUR', 'DAD', 'DANCE', 'DATA', 'DATE', 'DATING', 'DATSUN', 'DAY', 'DCLK', 'DDS', 'DE', 'DEAL', 'DEALER', 'DEALS', 'DEGREE', 'DELIVERY', 'DELL', 'DELOITTE', 'DELTA', 'DEMOCRAT', 'DENTAL', 'DENTIST', 'DESI', 'DESIGN', 'DEV', 'DHL', 'DIAMONDS', 'DIET', 'DIGITAL', 'DIRECT', 'DIRECTORY', 'DISCOUNT', 'DISCOVER', 'DISH', 'DIY', 'DJ', 'DK', 'DM', 'DNP', 'DO', 'DOCS', 'DOCTOR', 'DODGE', 'DOG', 'DOMAINS', 'DOT', 'DOWNLOAD', 'DRIVE', 'DTV', 'DUBAI', 'DUCK', 'DUNLOP', 'DUPONT', 'DURBAN', 'DVAG', 'DVR', 'DZ', 'EARTH', 'EAT', 'EC', 'ECO', 'EDEKA', 'EDU', 'EDUCATION', 'EE', 'EG', 'EMAIL', 'EMERCK', 'ENERGY', 'ENGINEER', 'ENGINEERING', 'ENTERPRISES', 'EPSON', 'EQUIPMENT', 'ER', 'ERICSSON', 'ERNI', 'ES', 'ESQ', 'ESTATE', 'ESURANCE', 'ET', 'ETISALAT', 'EU', 'EUROVISION', 'EUS', 'EVENTS', 'EVERBANK', 'EXCHANGE', 'EXPERT', 'EXPOSED', 'EXPRESS', 'EXTRASPACE', 'FAGE', 'FAIL', 'FAIRWINDS', 'FAITH', 'FAMILY', 'FAN', 'FANS', 'FARM', 'FARMERS', 'FASHION', 'FAST', 'FEDEX', 'FEEDBACK', 'FERRARI', 'FERRERO', 'FI', 'FIAT', 'FIDELITY', 'FIDO', 'FILM', 'FINAL', 'FINANCE', 'FINANCIAL', 'FIRE', 'FIRESTONE', 'FIRMDALE', 'FISH', 'FISHING', 'FIT', 'FITNESS', 'FJ', 'FK', 'FLICKR', 'FLIGHTS', 'FLIR', 'FLORIST', 'FLOWERS', 'FLY', 'FM', 'FO', 'FOO', 'FOOD', 'FOODNETWORK', 'FOOTBALL', 'FORD', 'FOREX', 'FORSALE', 'FORUM', 'FOUNDATION', 'FOX', 'FR', 'FREE', 'FRESENIUS', 'FRL', 'FROGANS', 'FRONTDOOR', 'FRONTIER', 'FTR', 'FUJITSU', 'FUJIXEROX', 'FUN', 'FUND', 'FURNITURE', 'FUTBOL', 'FYI', 'GA', 'GAL', 'GALLERY', 'GALLO', 'GALLUP', 'GAME', 'GAMES', 'GAP', 'GARDEN', 'GAY', 'GB', 'GBIZ', 'GD', 'GDN', 'GE', 'GEA', 'GENT', 'GENTING', 'GEORGE', 'GF', 'GG', 'GGEE', 'GH', 'GI', 'GIFT', 'GIFTS', 'GIVES', 'GIVING', 'GL', 'GLADE', 'GLASS', 'GLE', 'GLOBAL', 'GLOBO', 'GM', 'GMAIL', 'GMBH', 'GMO', 'GMX', 'GN', 'GODADDY', 'GOLD', 'GOLDPOINT', 'GOLF', 'GOO', 'GOODYEAR', 'GOOG', 'GOOGLE', 'GOP', 'GOT', 'GOV', 'GP', 'GQ', 'GR', 'GRAINGER', 'GRAPHICS', 'GRATIS', 'GREEN', 'GRIPE', 'GROCERY', 'GROUP', 'GS', 'GT', 'GU', 'GUARDIAN', 'GUCCI', 'GUGE', 'GUIDE', 'GUITARS', 'GURU', 'GW', 'GY', 'HAIR', 'HAMBURG', 'HANGOUT', 'HAUS', 'HBO', 'HDFC', 'HDFCBANK', 'HEALTH', 'HEALTHCARE', 'HELP', 'HELSINKI', 'HERE', 'HERMES', 'HGTV', 'HIPHOP', 'HISAMITSU', 'HITACHI', 'HIV', 'HK', 'HKT', 'HM', 'HN', 'HOCKEY', 'HOLDINGS', 'HOLIDAY', 'HOMEDEPOT', 'HOMEGOODS', 'HOMES', 'HOMESENSE', 'HONDA', 'HORSE', 'HOSPITAL', 'HOST', 'HOSTING', 'HOT', 'HOTELES', 'HOTELS', 'HOTMAIL', 'HOUSE', 'HOW', 'HR', 'HSBC', 'HT', 'HU', 'HUGHES', 'HYATT', 'HYUNDAI', 'IBM', 'ICBC', 'ICE', 'ICU', 'ID', 'IE', 'IEEE', 'IFM', 'IKANO', 'IL', 'IM', 'IMAMAT', 'IMDB', 'IMMO', 'IMMOBILIEN', 'IN', 'INC', 'INDUSTRIES', 'INFINITI', 'INFO', 'ING', 'INK', 'INSTITUTE', 'INSURANCE', 'INSURE', 'INT', 'INTEL', 'INTERNATIONAL', 'INTUIT', 'INVESTMENTS', 'IO', 'IPIRANGA', 'IQ', 'IR', 'IRISH', 'IS', 'ISMAILI', 'IST', 'ISTANBUL', 'IT', 'ITAU', 'ITV', 'IVECO', 'JAGUAR', 'JAVA', 'JCB', 'JCP', 'JE', 'JEEP', 'JETZT', 'JEWELRY', 'JIO', 'JLL', 'JM', 'JMP', 'JNJ', 'JO', 'JOBS', 'JOBURG', 'JOT', 'JOY', 'JP', 'JPMORGAN', 'JPRS', 'JUEGOS', 'JUNIPER', 'KAUFEN', 'KDDI', 'KE', 'KERRYHOTELS', 'KERRYLOGISTICS', 'KERRYPROPERTIES', 'KFH', 'KG', 'KH', 'KI', 'KIA', 'KIM', 'KINDER', 'KINDLE', 'KITCHEN', 'KIWI', 'KM', 'KN', 'KOELN', 'KOMATSU', 'KOSHER', 'KP', 'KPMG', 'KPN', 'KR', 'KRD', 'KRED', 'KUOKGROUP', 'KW', 'KY', 'KYOTO', 'KZ', 'LA', 'LACAIXA', 'LADBROKES', 'LAMBORGHINI', 'LAMER', 'LANCASTER', 'LANCIA', 'LANCOME', 'LAND', 'LANDROVER', 'LANXESS', 'LASALLE', 'LAT', 'LATINO', 'LATROBE', 'LAW', 'LAWYER', 'LB', 'LC', 'LDS', 'LEASE', 'LECLERC', 'LEFRAK', 'LEGAL', 'LEGO', 'LEXUS', 'LGBT', 'LI', 'LIAISON', 'LIDL', 'LIFE', 'LIFEINSURANCE', 'LIFESTYLE', 'LIGHTING', 'LIKE', 'LILLY', 'LIMITED', 'LIMO', 'LINCOLN', 'LINDE', 'LINK', 'LIPSY', 'LIVE', 'LIVING', 'LIXIL', 'LK', 'LLC', 'LOAN', 'LOANS', 'LOCKER', 'LOCUS', 'LOFT', 'LOL', 'LONDON', 'LOTTE', 'LOTTO', 'LOVE', 'LPL', 'LPLFINANCIAL', 'LR', 'LS', 'LT', 'LTD', 'LTDA', 'LU', 'LUNDBECK', 'LUPIN', 'LUXE', 'LUXURY', 'LV', 'LY', 'MA', 'MACYS', 'MADRID', 'MAIF', 'MAISON', 'MAKEUP', 'MAN', 'MANAGEMENT', 'MANGO', 'MAP', 'MARKET', 'MARKETING', 'MARKETS', 'MARRIOTT', 'MARSHALLS', 'MASERATI', 'MATTEL', 'MBA', 'MC', 'MCKINSEY', 'MD', 'ME', 'MED', 'MEDIA', 'MEET', 'MELBOURNE', 'MEME', 'MEMORIAL', 'MEN', 'MENU', 'MERCKMSD', 'METLIFE', 'MG', 'MH', 'MIAMI', 'MICROSOFT', 'MIL', 'MINI', 'MINT', 'MIT', 'MITSUBISHI', 'MK', 'ML', 'MLB', 'MLS', 'MM', 'MMA', 'MN', 'MO', 'MOBI', 'MOBILE', 'MODA', 'MOE', 'MOI', 'MOM', 'MONASH', 'MONEY', 'MONSTER', 'MOPAR', 'MORMON', 'MORTGAGE', 'MOSCOW', 'MOTO', 'MOTORCYCLES', 'MOV', 'MOVIE', 'MOVISTAR', 'MP', 'MQ', 'MR', 'MS', 'MSD', 'MT', 'MTN', 'MTR', 'MU', 'MUSEUM', 'MUTUAL', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NAB', 'NADEX', 'NAGOYA', 'NAME', 'NATIONWIDE', 'NATURA', 'NAVY', 'NBA', 'NC', 'NE', 'NEC', 'NET', 'NETBANK', 'NETFLIX', 'NETWORK', 'NEUSTAR', 'NEW', 'NEWHOLLAND', 'NEWS', 'NEXT', 'NEXTDIRECT', 'NEXUS', 'NF', 'NFL', 'NG', 'NGO', 'NHK', 'NI', 'NICO', 'NIKE', 'NIKON', 'NINJA', 'NISSAN', 'NISSAY', 'NL', 'NO', 'NOKIA', 'NORTHWESTERNMUTUAL', 'NORTON', 'NOW', 'NOWRUZ', 'NOWTV', 'NP', 'NR', 'NRA', 'NRW', 'NTT', 'NU', 'NYC', 'NZ', 'OBI', 'OBSERVER', 'OFF', 'OFFICE', 'OKINAWA', 'OLAYAN', 'OLAYANGROUP', 'OLDNAVY', 'OLLO', 'OM', 'OMEGA', 'ONE', 'ONG', 'ONL', 'ONLINE', 'ONYOURSIDE', 'OOO', 'OPEN', 'ORACLE', 'ORANGE', 'ORG', 'ORGANIC', 'ORIGINS', 'OSAKA', 'OTSUKA', 'OTT', 'OVH', 'PA', 'PAGE', 'PANASONIC', 'PARIS', 'PARS', 'PARTNERS', 'PARTS', 'PARTY', 'PASSAGENS', 'PAY', 'PCCW', 'PE', 'PET', 'PF', 'PFIZER', 'PG', 'PH', 'PHARMACY', 'PHD', 'PHILIPS', 'PHONE', 'PHOTO', 'PHOTOGRAPHY', 'PHOTOS', 'PHYSIO', 'PIAGET', 'PICS', 'PICTET', 'PICTURES', 'PID', 'PIN', 'PING', 'PINK', 'PIONEER', 'PIZZA', 'PK', 'PL', 'PLACE', 'PLAY', 'PLAYSTATION', 'PLUMBING', 'PLUS', 'PM', 'PN', 'PNC', 'POHL', 'POKER', 'POLITIE', 'PORN', 'POST', 'PR', 'PRAMERICA', 'PRAXI', 'PRESS', 'PRIME', 'PRO', 'PROD', 'PRODUCTIONS', 'PROF', 'PROGRESSIVE', 'PROMO', 'PROPERTIES', 'PROPERTY', 'PROTECTION', 'PRU', 'PRUDENTIAL', 'PS', 'PT', 'PUB', 'PW', 'PWC', 'PY', 'QA', 'QPON', 'QUEBEC', 'QUEST', 'QVC', 'RACING', 'RADIO', 'RAID', 'RE', 'READ', 'REALESTATE', 'REALTOR', 'REALTY', 'RECIPES', 'RED', 'REDSTONE', 'REDUMBRELLA', 'REHAB', 'REISE', 'REISEN', 'REIT', 'RELIANCE', 'REN', 'RENT', 'RENTALS', 'REPAIR', 'REPORT', 'REPUBLICAN', 'REST', 'RESTAURANT', 'REVIEW', 'REVIEWS', 'REXROTH', 'RICH', 'RICHARDLI', 'RICOH', 'RIGHTATHOME', 'RIL', 'RIO', 'RIP', 'RMIT', 'RO', 'ROCHER', 'ROCKS', 'RODEO', 'ROGERS', 'ROOM', 'RS', 'RSVP', 'RU', 'RUGBY', 'RUHR', 'RUN', 'RW', 'RWE', 'RYUKYU', 'SA', 'SAARLAND', 'SAFE', 'SAFETY', 'SAKURA', 'SALE', 'SALON', 'SAMSCLUB', 'SAMSUNG', 'SANDVIK', 'SANDVIKCOROMANT', 'SANOFI', 'SAP', 'SARL', 'SAS', 'SAVE', 'SAXO', 'SB', 'SBI', 'SBS', 'SC', 'SCA', 'SCB', 'SCHAEFFLER', 'SCHMIDT', 'SCHOLARSHIPS', 'SCHOOL', 'SCHULE', 'SCHWARZ', 'SCIENCE', 'SCJOHNSON', 'SCOR', 'SCOT', 'SD', 'SE', 'SEARCH', 'SEAT', 'SECURE', 'SECURITY', 'SEEK', 'SELECT', 'SENER', 'SERVICES', 'SES', 'SEVEN', 'SEW', 'SEX', 'SEXY', 'SFR', 'SG', 'SH', 'SHANGRILA', 'SHARP', 'SHAW', 'SHELL', 'SHIA', 'SHIKSHA', 'SHOES', 'SHOP', 'SHOPPING', 'SHOUJI', 'SHOW', 'SHOWTIME', 'SHRIRAM', 'SI', 'SILK', 'SINA', 'SINGLES', 'SITE', 'SJ', 'SK', 'SKI', 'SKIN', 'SKY', 'SKYPE', 'SL', 'SLING', 'SM', 'SMART', 'SMILE', 'SN', 'SNCF', 'SO', 'SOCCER', 'SOCIAL', 'SOFTBANK', 'SOFTWARE', 'SOHU', 'SOLAR', 'SOLUTIONS', 'SONG', 'SONY', 'SOY', 'SPACE', 'SPORT', 'SPOT', 'SPREADBETTING', 'SR', 'SRL', 'SRT', 'SS', 'ST', 'STADA', 'STAPLES', 'STAR', 'STATEBANK', 'STATEFARM', 'STC', 'STCGROUP', 'STOCKHOLM', 'STORAGE', 'STORE', 'STREAM', 'STUDIO', 'STUDY', 'STYLE', 'SU', 'SUCKS', 'SUPPLIES', 'SUPPLY', 'SUPPORT', 'SURF', 'SURGERY', 'SUZUKI', 'SV', 'SWATCH', 'SWIFTCOVER', 'SWISS', 'SX', 'SY', 'SYDNEY', 'SYMANTEC', 'SYSTEMS', 'SZ', 'TAB', 'TAIPEI', 'TALK', 'TAOBAO', 'TARGET', 'TATAMOTORS', 'TATAR', 'TATTOO', 'TAX', 'TAXI', 'TC', 'TCI', 'TD', 'TDK', 'TEAM', 'TECH', 'TECHNOLOGY', 'TEL', 'TELEFONICA', 'TEMASEK', 'TENNIS', 'TEVA', 'TF', 'TG', 'TH', 'THD', 'THEATER', 'THEATRE', 'TIAA', 'TICKETS', 'TIENDA', 'TIFFANY', 'TIPS', 'TIRES', 'TIROL', 'TJ', 'TJMAXX', 'TJX', 'TK', 'TKMAXX', 'TL', 'TM', 'TMALL', 'TN', 'TO', 'TODAY', 'TOKYO', 'TOOLS', 'TOP', 'TORAY', 'TOSHIBA', 'TOTAL', 'TOURS', 'TOWN', 'TOYOTA', 'TOYS', 'TR', 'TRADE', 'TRADING', 'TRAINING', 'TRAVEL', 'TRAVELCHANNEL', 'TRAVELERS', 'TRAVELERSINSURANCE', 'TRUST', 'TRV', 'TT', 'TUBE', 'TUI', 'TUNES', 'TUSHU', 'TV', 'TVS', 'TW', 'TZ', 'UA', 'UBANK', 'UBS', 'UCONNECT', 'UG', 'UK', 'UNICOM', 'UNIVERSITY', 'UNO', 'UOL', 'UPS', 'US', 'UY', 'UZ', 'VA', 'VACATIONS', 'VANA', 'VANGUARD', 'VC', 'VE', 'VEGAS', 'VENTURES', 'VERISIGN', 'VERSICHERUNG', 'VET', 'VG', 'VI', 'VIAJES', 'VIDEO', 'VIG', 'VIKING', 'VILLAS', 'VIN', 'VIP', 'VIRGIN', 'VISA', 'VISION', 'VISTAPRINT', 'VIVA', 'VIVO', 'VLAANDEREN', 'VN', 'VODKA', 'VOLKSWAGEN', 'VOLVO', 'VOTE', 'VOTING', 'VOTO', 'VOYAGE', 'VU', 'VUELOS', 'WALES', 'WALMART', 'WALTER', 'WANG', 'WANGGOU', 'WARMAN', 'WATCH', 'WATCHES', 'WEATHER', 'WEATHERCHANNEL', 'WEBCAM', 'WEBER', 'WEBSITE', 'WED', 'WEDDING', 'WEIBO', 'WEIR', 'WF', 'WHOSWHO', 'WIEN', 'WIKI', 'WILLIAMHILL', 'WIN', 'WINDOWS', 'WINE', 'WINNERS', 'WME', 'WOLTERSKLUWER', 'WOODSIDE', 'WORK', 'WORKS', 'WORLD', 'WOW', 'WS', 'WTC', 'WTF', 'XBOX', 'XEROX', 'XFINITY', 'XIHUAN', 'XIN', 'XN--11B4C3D', 'XN--1CK2E1B', 'XN--1QQW23A', 'XN--2SCRJ9C', 'XN--30RR7Y', 'XN--3BST00M', 'XN--3DS443G', 'XN--3E0B707E', 'XN--3HCRJ9C', 'XN--3OQ18VL8PN36A', 'XN--3PXU8K', 'XN--42C2D9A', 'XN--45BR5CYL', 'XN--45BRJ9C', 'XN--45Q11C', 'XN--4GBRIM', 'XN--54B7FTA0CC', 'XN--55QW42G', 'XN--55QX5D', 'XN--5SU34J936BGSG', 'XN--5TZM5G', 'XN--6FRZ82G', 'XN--6QQ986B3XL', 'XN--80ADXHKS', 'XN--80AO21A', 'XN--80AQECDR1A', 'XN--80ASEHDB', 'XN--80ASWG', 'XN--8Y0A063A', 'XN--90A3AC', 'XN--90AE', 'XN--90AIS', 'XN--9DBQ2A', 'XN--9ET52U', 'XN--9KRT00A', 'XN--B4W605FERD', 'XN--BCK1B9A5DRE4C', 'XN--C1AVG', 'XN--C2BR7G', 'XN--CCK2B3B', 'XN--CG4BKI', 'XN--CLCHC0EA0B2G2A9GCD', 'XN--CZR694B', 'XN--CZRS0T', 'XN--CZRU2D', 'XN--D1ACJ3B', 'XN--D1ALF', 'XN--E1A4C', 'XN--ECKVDTC9D', 'XN--EFVY88H', 'XN--ESTV75G', 'XN--FCT429K', 'XN--FHBEI', 'XN--FIQ228C5HS', 'XN--FIQ64B', 'XN--FIQS8S', 'XN--FIQZ9S', 'XN--FJQ720A', 'XN--FLW351E', 'XN--FPCRJ9C3D', 'XN--FZC2C9E2C', 'XN--FZYS8D69UVGM', 'XN--G2XX48C', 'XN--GCKR3F0F', 'XN--GECRJ9C', 'XN--GK3AT1E', 'XN--H2BREG3EVE', 'XN--H2BRJ9C', 'XN--H2BRJ9C8C', 'XN--HXT814E', 'XN--I1B6B1A6A2E', 'XN--IMR513N', 'XN--IO0A7I', 'XN--J1AEF', 'XN--J1AMH', 'XN--J6W193G', 'XN--JLQ61U9W7B', 'XN--JVR189M', 'XN--KCRX77D1X4A', 'XN--KPRW13D', 'XN--KPRY57D', 'XN--KPU716F', 'XN--KPUT3I', 'XN--L1ACC', 'XN--LGBBAT1AD8J', 'XN--MGB9AWBF', 'XN--MGBA3A3EJT', 'XN--MGBA3A4F16A', 'XN--MGBA7C0BBN0A', 'XN--MGBAAKC7DVF', 'XN--MGBAAM7A8H', 'XN--MGBAB2BD', 'XN--MGBAH1A3HJKRD', 'XN--MGBAI9AZGQP6J', 'XN--MGBAYH7GPA', 'XN--MGBBH1A', 'XN--MGBBH1A71E', 'XN--MGBC0A9AZCG', 'XN--MGBCA7DZDO', 'XN--MGBERP4A5D4AR', 'XN--MGBGU82A', 'XN--MGBI4ECEXP', 'XN--MGBPL2FH', 'XN--MGBT3DHD', 'XN--MGBTX2B', 'XN--MGBX4CD0AB', 'XN--MIX891F', 'XN--MK1BU44C', 'XN--MXTQ1M', 'XN--NGBC5AZD', 'XN--NGBE9E0A', 'XN--NGBRX', 'XN--NODE', 'XN--NQV7F', 'XN--NQV7FS00EMA', 'XN--NYQY26A', 'XN--O3CW4H', 'XN--OGBPF8FL', 'XN--OTU796D', 'XN--P1ACF', 'XN--P1AI', 'XN--PBT977C', 'XN--PGBS0DH', 'XN--PSSY2U', 'XN--Q9JYB4C', 'XN--QCKA1PMC', 'XN--QXA6A', 'XN--QXAM', 'XN--RHQV96G', 'XN--ROVU88B', 'XN--RVC1E0AM3E', 'XN--S9BRJ9C', 'XN--SES554G', 'XN--T60B56A', 'XN--TCKWE', 'XN--TIQ49XQYJ', 'XN--UNUP4Y', 'XN--VERMGENSBERATER-CTB', 'XN--VERMGENSBERATUNG-PWB', 'XN--VHQUV', 'XN--VUQ861B', 'XN--W4R85EL8FHU5DNRA', 'XN--W4RS40L', 'XN--WGBH1C', 'XN--WGBL6A', 'XN--XHQ521B', 'XN--XKC2AL3HYE2A', 'XN--XKC2DL3A5EE0H', 'XN--Y9A3AQ', 'XN--YFRO4I67O', 'XN--YGBI2AMMX', 'XN--ZFR164B', 'XXX', 'XYZ', 'YACHTS', 'YAHOO', 'YAMAXUN', 'YANDEX', 'YE', 'YODOBASHI', 'YOGA', 'YOKOHAMA', 'YOU', 'YOUTUBE', 'YT', 'YUN', 'ZA', 'ZAPPOS', 'ZARA', 'ZERO', 'ZIP', 'ZM', 'ZONE', 'ZUERICH', 'ZW']; // Keep as upper-case to make updating from source easier

module.exports = new Set(internals.tlds.map(tld => tld.toLowerCase()));

/***/ }),

/***/ "./node_modules/@hapi/address/lib/uri.js":
/*!***********************************************!*\
  !*** ./node_modules/@hapi/address/lib/uri.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const EscapeRegex = __webpack_require__(/*! @hapi/hoek/lib/escapeRegex */ "./node_modules/@hapi/hoek/lib/escapeRegex.js");

const internals = {};

internals.generate = function () {
  const rfc3986 = {};
  const hexDigit = '\\dA-Fa-f'; // HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"

  const hexDigitOnly = '[' + hexDigit + ']';
  const unreserved = '\\w-\\.~'; // unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"

  const subDelims = '!\\$&\'\\(\\)\\*\\+,;='; // sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="

  const pctEncoded = '%' + hexDigit; // pct-encoded = "%" HEXDIG HEXDIG

  const pchar = unreserved + pctEncoded + subDelims + ':@'; // pchar = unreserved / pct-encoded / sub-delims / ":" / "@"

  const pcharOnly = '[' + pchar + ']';
  const decOctect = '(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])'; // dec-octet = DIGIT / %x31-39 DIGIT / "1" 2DIGIT / "2" %x30-34 DIGIT / "25" %x30-35  ; 0-9 / 10-99 / 100-199 / 200-249 / 250-255

  rfc3986.ipv4address = '(?:' + decOctect + '\\.){3}' + decOctect; // IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet

  /*
      h16 = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
      ls32 = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
      IPv6address =                            6( h16 ":" ) ls32
                  /                       "::" 5( h16 ":" ) ls32
                  / [               h16 ] "::" 4( h16 ":" ) ls32
                  / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
                  / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
                  / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
                  / [ *4( h16 ":" ) h16 ] "::"              ls32
                  / [ *5( h16 ":" ) h16 ] "::"              h16
                  / [ *6( h16 ":" ) h16 ] "::"
  */

  const h16 = hexDigitOnly + '{1,4}';
  const ls32 = '(?:' + h16 + ':' + h16 + '|' + rfc3986.ipv4address + ')';
  const IPv6SixHex = '(?:' + h16 + ':){6}' + ls32;
  const IPv6FiveHex = '::(?:' + h16 + ':){5}' + ls32;
  const IPv6FourHex = '(?:' + h16 + ')?::(?:' + h16 + ':){4}' + ls32;
  const IPv6ThreeHex = '(?:(?:' + h16 + ':){0,1}' + h16 + ')?::(?:' + h16 + ':){3}' + ls32;
  const IPv6TwoHex = '(?:(?:' + h16 + ':){0,2}' + h16 + ')?::(?:' + h16 + ':){2}' + ls32;
  const IPv6OneHex = '(?:(?:' + h16 + ':){0,3}' + h16 + ')?::' + h16 + ':' + ls32;
  const IPv6NoneHex = '(?:(?:' + h16 + ':){0,4}' + h16 + ')?::' + ls32;
  const IPv6NoneHex2 = '(?:(?:' + h16 + ':){0,5}' + h16 + ')?::' + h16;
  const IPv6NoneHex3 = '(?:(?:' + h16 + ':){0,6}' + h16 + ')?::';
  rfc3986.ipv4Cidr = '(?:\\d|[1-2]\\d|3[0-2])'; // IPv4 cidr = DIGIT / %x31-32 DIGIT / "3" %x30-32  ; 0-9 / 10-29 / 30-32

  rfc3986.ipv6Cidr = '(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])'; // IPv6 cidr = DIGIT / %x31-39 DIGIT / "1" %x0-1 DIGIT / "12" %x0-8;   0-9 / 10-99 / 100-119 / 120-128

  rfc3986.ipv6address = '(?:' + IPv6SixHex + '|' + IPv6FiveHex + '|' + IPv6FourHex + '|' + IPv6ThreeHex + '|' + IPv6TwoHex + '|' + IPv6OneHex + '|' + IPv6NoneHex + '|' + IPv6NoneHex2 + '|' + IPv6NoneHex3 + ')';
  rfc3986.ipvFuture = 'v' + hexDigitOnly + '+\\.[' + unreserved + subDelims + ':]+'; // IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )

  rfc3986.scheme = '[a-zA-Z][a-zA-Z\\d+-\\.]*'; // scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )

  rfc3986.schemeRegex = new RegExp(rfc3986.scheme);
  const userinfo = '[' + unreserved + pctEncoded + subDelims + ':]*'; // userinfo = *( unreserved / pct-encoded / sub-delims / ":" )

  const IPLiteral = '\\[(?:' + rfc3986.ipv6address + '|' + rfc3986.ipvFuture + ')\\]'; // IP-literal = "[" ( IPv6address / IPvFuture  ) "]"

  const regName = '[' + unreserved + pctEncoded + subDelims + ']{1,255}'; // reg-name = *( unreserved / pct-encoded / sub-delims )

  const host = '(?:' + IPLiteral + '|' + rfc3986.ipv4address + '|' + regName + ')'; // host = IP-literal / IPv4address / reg-name

  const port = '\\d*'; // port = *DIGIT

  const authority = '(?:' + userinfo + '@)?' + host + '(?::' + port + ')?'; // authority   = [ userinfo "@" ] host [ ":" port ]

  const authorityCapture = '(?:' + userinfo + '@)?(' + host + ')(?::' + port + ')?';
  /*
      segment       = *pchar
      segment-nz    = 1*pchar
      path          = path-abempty    ; begins with "/" '|' is empty
                  / path-absolute   ; begins with "/" but not "//"
                  / path-noscheme   ; begins with a non-colon segment
                  / path-rootless   ; begins with a segment
                  / path-empty      ; zero characters
      path-abempty  = *( "/" segment )
      path-absolute = "/" [ segment-nz *( "/" segment ) ]
      path-rootless = segment-nz *( "/" segment )
  */

  const segment = pcharOnly + '*';
  const segmentNz = pcharOnly + '+';
  const segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@' + ']+';
  const pathEmpty = '';
  const pathAbEmpty = '(?:\\/' + segment + ')*';
  const pathAbsolute = '\\/(?:' + segmentNz + pathAbEmpty + ')?';
  const pathRootless = segmentNz + pathAbEmpty;
  const pathNoScheme = segmentNzNc + pathAbEmpty;
  const pathAbNoAuthority = '(?:\\/\\/\\/' + segment + pathAbEmpty + ')'; // Used by file:///
  // hier-part = "//" authority path

  rfc3986.hierPart = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathRootless + '|' + pathAbNoAuthority + ')';
  rfc3986.hierPartCapture = '(?:' + '(?:\\/\\/' + authorityCapture + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathRootless + ')'; // relative-part = "//" authority path-abempty / path-absolute / path-noscheme / path-empty

  rfc3986.relativeRef = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathNoScheme + '|' + pathEmpty + ')';
  rfc3986.relativeRefCapture = '(?:' + '(?:\\/\\/' + authorityCapture + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathNoScheme + '|' + pathEmpty + ')'; // query = *( pchar / "/" / "?" )
  // query = *( pchar / "[" / "]" / "/" / "?" )

  rfc3986.query = '[' + pchar + '\\/\\?]*(?=#|$)'; //Finish matching either at the fragment part '|' end of the line.

  rfc3986.queryWithSquareBrackets = '[' + pchar + '\\[\\]\\/\\?]*(?=#|$)'; // fragment = *( pchar / "/" / "?" )

  rfc3986.fragment = '[' + pchar + '\\/\\?]*';
  return rfc3986;
};

internals.rfc3986 = internals.generate();
exports.ip = {
  v4Cidr: internals.rfc3986.ipv4Cidr,
  v6Cidr: internals.rfc3986.ipv6Cidr,
  ipv4: internals.rfc3986.ipv4address,
  ipv6: internals.rfc3986.ipv6address,
  ipvfuture: internals.rfc3986.ipvFuture
};

internals.createRegex = function (options) {
  const rfc = internals.rfc3986; // Construct expression

  const query = options.allowQuerySquareBrackets ? rfc.queryWithSquareBrackets : rfc.query;
  const suffix = '(?:\\?' + query + ')?' + '(?:#' + rfc.fragment + ')?'; // relative-ref = relative-part [ "?" query ] [ "#" fragment ]

  const relative = options.domain ? rfc.relativeRefCapture : rfc.relativeRef;

  if (options.relativeOnly) {
    return internals.wrap(relative + suffix);
  } // Custom schemes


  let customScheme = '';

  if (options.scheme) {
    Assert(options.scheme instanceof RegExp || typeof options.scheme === 'string' || Array.isArray(options.scheme), 'scheme must be a RegExp, String, or Array');
    const schemes = [].concat(options.scheme);
    Assert(schemes.length >= 1, 'scheme must have at least 1 scheme specified'); // Flatten the array into a string to be used to match the schemes

    const selections = [];

    for (let i = 0; i < schemes.length; ++i) {
      const scheme = schemes[i];
      Assert(scheme instanceof RegExp || typeof scheme === 'string', 'scheme at position ' + i + ' must be a RegExp or String');

      if (scheme instanceof RegExp) {
        selections.push(scheme.source.toString());
      } else {
        Assert(rfc.schemeRegex.test(scheme), 'scheme at position ' + i + ' must be a valid scheme');
        selections.push(EscapeRegex(scheme));
      }
    }

    customScheme = selections.join('|');
  } // URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]


  const scheme = customScheme ? '(?:' + customScheme + ')' : rfc.scheme;
  const absolute = '(?:' + scheme + ':' + (options.domain ? rfc.hierPartCapture : rfc.hierPart) + ')';
  const prefix = options.allowRelative ? '(?:' + absolute + '|' + relative + ')' : absolute;
  return internals.wrap(prefix + suffix, customScheme);
};

internals.wrap = function (raw, scheme) {
  raw = `(?=.)(?!https?\:/$)${raw}`; // Require at least one character and explicitly forbid 'http:/'

  return {
    raw,
    regex: new RegExp(`^${raw}$`),
    scheme
  };
};

internals.uriRegex = internals.createRegex({});

exports.regex = function (options = {}) {
  if (options.scheme || options.allowRelative || options.relativeOnly || options.allowQuerySquareBrackets || options.domain) {
    return internals.createRegex(options);
  }

  return internals.uriRegex;
};

/***/ }),

/***/ "./node_modules/@hapi/formula/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@hapi/formula/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {
  operators: ['!', '^', '*', '/', '%', '+', '-', '<', '<=', '>', '>=', '==', '!=', '&&', '||', '??'],
  operatorCharacters: ['!', '^', '*', '/', '%', '+', '-', '<', '=', '>', '&', '|', '?'],
  operatorsOrder: [['^'], ['*', '/', '%'], ['+', '-'], ['<', '<=', '>', '>='], ['==', '!='], ['&&'], ['||', '??']],
  operatorsPrefix: ['!', 'n'],
  literals: {
    '"': '"',
    '`': '`',
    '\'': '\'',
    '[': ']'
  },
  numberRx: /^(?:[0-9]*\.?[0-9]*){1}$/,
  tokenRx: /^[\w\$\#\.\@\:\{\}]+$/,
  symbol: Symbol('formula'),
  settings: Symbol('settings')
};
exports.Parser = class {
  constructor(string, options = {}) {
    if (!options[internals.settings] && options.constants) {
      for (const constant in options.constants) {
        const value = options.constants[constant];

        if (value !== null && !['boolean', 'number', 'string'].includes(typeof value)) {
          throw new Error(`Formula constant ${constant} contains invalid ${typeof value} value type`);
        }
      }
    }

    this.settings = options[internals.settings] ? options : Object.assign({
      [internals.settings]: true,
      constants: {},
      functions: {}
    }, options);
    this.single = null;
    this._parts = null;

    this._parse(string);
  }

  _parse(string) {
    let parts = [];
    let current = '';
    let parenthesis = 0;
    let literal = false;

    const flush = inner => {
      if (parenthesis) {
        throw new Error('Formula missing closing parenthesis');
      }

      const last = parts.length ? parts[parts.length - 1] : null;

      if (!literal && !current && !inner) {
        return;
      }

      if (last && last.type === 'reference' && inner === ')') {
        // Function
        last.type = 'function';
        last.value = this._subFormula(current, last.value);
        current = '';
        return;
      }

      if (inner === ')') {
        // Segment
        const sub = new exports.Parser(current, this.settings);
        parts.push({
          type: 'segment',
          value: sub
        });
      } else if (literal) {
        if (literal === ']') {
          // Reference
          parts.push({
            type: 'reference',
            value: current
          });
          current = '';
          return;
        }

        parts.push({
          type: 'literal',
          value: current
        }); // Literal
      } else if (internals.operatorCharacters.includes(current)) {
        // Operator
        if (last && last.type === 'operator' && internals.operators.includes(last.value + current)) {
          // 2 characters operator
          last.value += current;
        } else {
          parts.push({
            type: 'operator',
            value: current
          });
        }
      } else if (current.match(internals.numberRx)) {
        // Number
        parts.push({
          type: 'constant',
          value: parseFloat(current)
        });
      } else if (this.settings.constants[current] !== undefined) {
        // Constant
        parts.push({
          type: 'constant',
          value: this.settings.constants[current]
        });
      } else {
        // Reference
        if (!current.match(internals.tokenRx)) {
          throw new Error(`Formula contains invalid token: ${current}`);
        }

        parts.push({
          type: 'reference',
          value: current
        });
      }

      current = '';
    };

    for (const c of string) {
      if (literal) {
        if (c === literal) {
          flush();
          literal = false;
        } else {
          current += c;
        }
      } else if (parenthesis) {
        if (c === '(') {
          current += c;
          ++parenthesis;
        } else if (c === ')') {
          --parenthesis;

          if (!parenthesis) {
            flush(c);
          } else {
            current += c;
          }
        } else {
          current += c;
        }
      } else if (c in internals.literals) {
        literal = internals.literals[c];
      } else if (c === '(') {
        flush();
        ++parenthesis;
      } else if (internals.operatorCharacters.includes(c)) {
        flush();
        current = c;
        flush();
      } else if (c !== ' ') {
        current += c;
      } else {
        flush();
      }
    }

    flush(); // Replace prefix - to internal negative operator

    parts = parts.map((part, i) => {
      if (part.type !== 'operator' || part.value !== '-' || i && parts[i - 1].type !== 'operator') {
        return part;
      }

      return {
        type: 'operator',
        value: 'n'
      };
    }); // Validate tokens order

    let operator = false;

    for (const part of parts) {
      if (part.type === 'operator') {
        if (internals.operatorsPrefix.includes(part.value)) {
          continue;
        }

        if (!operator) {
          throw new Error('Formula contains an operator in invalid position');
        }

        if (!internals.operators.includes(part.value)) {
          throw new Error(`Formula contains an unknown operator ${part.value}`);
        }
      } else if (operator) {
        throw new Error('Formula missing expected operator');
      }

      operator = !operator;
    }

    if (!operator) {
      throw new Error('Formula contains invalid trailing operator');
    } // Identify single part


    if (parts.length === 1 && ['reference', 'literal', 'constant'].includes(parts[0].type)) {
      this.single = {
        type: parts[0].type === 'reference' ? 'reference' : 'value',
        value: parts[0].value
      };
    } // Process parts


    this._parts = parts.map(part => {
      // Operators
      if (part.type === 'operator') {
        return internals.operatorsPrefix.includes(part.value) ? part : part.value;
      } // Literals, constants, segments


      if (part.type !== 'reference') {
        return part.value;
      } // References


      if (this.settings.tokenRx && !this.settings.tokenRx.test(part.value)) {
        throw new Error(`Formula contains invalid reference ${part.value}`);
      }

      if (this.settings.reference) {
        return this.settings.reference(part.value);
      }

      return internals.reference(part.value);
    });
  }

  _subFormula(string, name) {
    const method = this.settings.functions[name];

    if (typeof method !== 'function') {
      throw new Error(`Formula contains unknown function ${name}`);
    }

    let args = [];

    if (string) {
      let current = '';
      let parenthesis = 0;
      let literal = false;

      const flush = () => {
        if (!current) {
          throw new Error(`Formula contains function ${name} with invalid arguments ${string}`);
        }

        args.push(current);
        current = '';
      };

      for (let i = 0; i < string.length; ++i) {
        const c = string[i];

        if (literal) {
          current += c;

          if (c === literal) {
            literal = false;
          }
        } else if (c in internals.literals && !parenthesis) {
          current += c;
          literal = internals.literals[c];
        } else if (c === ',' && !parenthesis) {
          flush();
        } else {
          current += c;

          if (c === '(') {
            ++parenthesis;
          } else if (c === ')') {
            --parenthesis;
          }
        }
      }

      flush();
    }

    args = args.map(arg => new exports.Parser(arg, this.settings));
    return function (context) {
      const innerValues = [];

      for (const arg of args) {
        innerValues.push(arg.evaluate(context));
      }

      return method.call(context, ...innerValues);
    };
  }

  evaluate(context) {
    const parts = this._parts.slice(); // Prefix operators


    for (let i = parts.length - 2; i >= 0; --i) {
      const part = parts[i];

      if (part && part.type === 'operator') {
        const current = parts[i + 1];
        parts.splice(i + 1, 1);
        const value = internals.evaluate(current, context);
        parts[i] = internals.single(part.value, value);
      }
    } // Left-right operators


    internals.operatorsOrder.forEach(set => {
      for (let i = 1; i < parts.length - 1;) {
        if (set.includes(parts[i])) {
          const operator = parts[i];
          const left = internals.evaluate(parts[i - 1], context);
          const right = internals.evaluate(parts[i + 1], context);
          parts.splice(i, 2);
          const result = internals.calculate(operator, left, right);
          parts[i - 1] = result === 0 ? 0 : result; // Convert -0
        } else {
          i += 2;
        }
      }
    });
    return internals.evaluate(parts[0], context);
  }

};
exports.Parser.prototype[internals.symbol] = true;

internals.reference = function (name) {
  return function (context) {
    return context && context[name] !== undefined ? context[name] : null;
  };
};

internals.evaluate = function (part, context) {
  if (part === null) {
    return null;
  }

  if (typeof part === 'function') {
    return part(context);
  }

  if (part[internals.symbol]) {
    return part.evaluate(context);
  }

  return part;
};

internals.single = function (operator, value) {
  if (operator === '!') {
    return value ? false : true;
  } // operator === 'n'


  const negative = -value;

  if (negative === 0) {
    // Override -0
    return 0;
  }

  return negative;
};

internals.calculate = function (operator, left, right) {
  if (operator === '??') {
    return internals.exists(left) ? left : right;
  }

  if (typeof left === 'string' || typeof right === 'string') {
    if (operator === '+') {
      left = internals.exists(left) ? left : '';
      right = internals.exists(right) ? right : '';
      return left + right;
    }
  } else {
    switch (operator) {
      case '^':
        return Math.pow(left, right);

      case '*':
        return left * right;

      case '/':
        return left / right;

      case '%':
        return left % right;

      case '+':
        return left + right;

      case '-':
        return left - right;
    }
  }

  switch (operator) {
    case '<':
      return left < right;

    case '<=':
      return left <= right;

    case '>':
      return left > right;

    case '>=':
      return left >= right;

    case '==':
      return left === right;

    case '!=':
      return left !== right;

    case '&&':
      return left && right;

    case '||':
      return left || right;
  }

  return null;
};

internals.exists = function (value) {
  return value !== null && value !== undefined;
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/applyToDefaults.js":
/*!********************************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/applyToDefaults.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! ./assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! ./clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Merge = __webpack_require__(/*! ./merge */ "./node_modules/@hapi/hoek/lib/merge.js");

const Reach = __webpack_require__(/*! ./reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const internals = {};

module.exports = function (defaults, source, options = {}) {
  Assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
  Assert(!source || source === true || typeof source === 'object', 'Invalid source value: must be true, falsy or an object');
  Assert(typeof options === 'object', 'Invalid options: must be an object');

  if (!source) {
    // If no source, return null
    return null;
  }

  if (options.shallow) {
    return internals.applyToDefaultsWithShallow(defaults, source, options);
  }

  const copy = Clone(defaults);

  if (source === true) {
    // If source is set to true, use defaults
    return copy;
  }

  const nullOverride = options.nullOverride !== undefined ? options.nullOverride : false;
  return Merge(copy, source, {
    nullOverride,
    mergeArrays: false
  });
};

internals.applyToDefaultsWithShallow = function (defaults, source, options) {
  const keys = options.shallow;
  Assert(Array.isArray(keys), 'Invalid keys');
  const seen = new Map();
  const merge = source === true ? null : new Set();

  for (let key of keys) {
    key = Array.isArray(key) ? key : key.split('.'); // Pre-split optimization

    const ref = Reach(defaults, key);

    if (ref && typeof ref === 'object') {
      seen.set(ref, merge && Reach(source, key) || ref);
    } else if (merge) {
      merge.add(key);
    }
  }

  const copy = Clone(defaults, {}, seen);

  if (!merge) {
    return copy;
  }

  for (const key of merge) {
    internals.reachCopy(copy, source, key);
  }

  return Merge(copy, source, {
    mergeArrays: false,
    nullOverride: false
  });
};

internals.reachCopy = function (dst, src, path) {
  for (const segment of path) {
    if (!(segment in src)) {
      return;
    }

    src = src[segment];
  }

  const value = src;
  let ref = dst;

  for (let i = 0; i < path.length - 1; ++i) {
    const segment = path[i];

    if (typeof ref[segment] !== 'object') {
      ref[segment] = {};
    }

    ref = ref[segment];
  }

  ref[path[path.length - 1]] = value;
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/assert.js":
/*!***********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/assert.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AssertError = __webpack_require__(/*! ./error */ "./node_modules/@hapi/hoek/lib/error.js");

const internals = {};

module.exports = function (condition, ...args) {
  if (condition) {
    return;
  }

  if (args.length === 1 && args[0] instanceof Error) {
    throw args[0];
  }

  throw new AssertError(args);
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/clone.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/clone.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Reach = __webpack_require__(/*! ./reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const Types = __webpack_require__(/*! ./types */ "./node_modules/@hapi/hoek/lib/types.js");

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/@hapi/hoek/lib/utils.js");

const internals = {
  needsProtoHack: new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
};

module.exports = internals.clone = function (obj, options = {}, _seen = null) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let clone = internals.clone;
  let seen = _seen;

  if (options.shallow) {
    if (options.shallow !== true) {
      return internals.cloneWithShallow(obj, options);
    }

    clone = value => value;
  } else if (seen) {
    const lookup = seen.get(obj);

    if (lookup) {
      return lookup;
    }
  } else {
    seen = new Map();
  } // Built-in object types


  const baseProto = Types.getInternalProto(obj);

  if (baseProto === Types.buffer) {
    return Buffer && Buffer.from(obj); // $lab:coverage:ignore$
  }

  if (baseProto === Types.date) {
    return new Date(obj.getTime());
  }

  if (baseProto === Types.regex) {
    return new RegExp(obj);
  } // Generic objects


  const newObj = internals.base(obj, baseProto, options);

  if (newObj === obj) {
    return obj;
  }

  if (seen) {
    seen.set(obj, newObj); // Set seen, since obj could recurse
  }

  if (baseProto === Types.set) {
    for (const value of obj) {
      newObj.add(clone(value, options, seen));
    }
  } else if (baseProto === Types.map) {
    for (const [key, value] of obj) {
      newObj.set(key, clone(value, options, seen));
    }
  }

  const keys = Utils.keys(obj, options);

  for (const key of keys) {
    if (key === '__proto__') {
      continue;
    }

    if (baseProto === Types.array && key === 'length') {
      newObj.length = obj.length;
      continue;
    }

    const descriptor = Object.getOwnPropertyDescriptor(obj, key);

    if (descriptor) {
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(newObj, key, descriptor);
      } else if (descriptor.enumerable) {
        newObj[key] = clone(obj[key], options, seen);
      } else {
        Object.defineProperty(newObj, key, {
          enumerable: false,
          writable: true,
          configurable: true,
          value: clone(obj[key], options, seen)
        });
      }
    } else {
      Object.defineProperty(newObj, key, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: clone(obj[key], options, seen)
      });
    }
  }

  return newObj;
};

internals.cloneWithShallow = function (source, options) {
  const keys = options.shallow;
  options = Object.assign({}, options);
  options.shallow = false;
  const seen = new Map();

  for (const key of keys) {
    const ref = Reach(source, key);

    if (typeof ref === 'object' || typeof ref === 'function') {
      seen.set(ref, ref);
    }
  }

  return internals.clone(source, options, seen);
};

internals.base = function (obj, baseProto, options) {
  if (options.prototype === false) {
    // Defaults to true
    if (internals.needsProtoHack.has(baseProto)) {
      return new baseProto.constructor();
    }

    return baseProto === Types.array ? [] : {};
  }

  const proto = Object.getPrototypeOf(obj);

  if (proto && proto.isImmutable) {
    return obj;
  }

  if (baseProto === Types.array) {
    const newObj = [];

    if (proto !== baseProto) {
      Object.setPrototypeOf(newObj, proto);
    }

    return newObj;
  }

  if (internals.needsProtoHack.has(baseProto)) {
    const newObj = new proto.constructor();

    if (proto !== baseProto) {
      Object.setPrototypeOf(newObj, proto);
    }

    return newObj;
  }

  return Object.create(proto);
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/deepEqual.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/deepEqual.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Types = __webpack_require__(/*! ./types */ "./node_modules/@hapi/hoek/lib/types.js");

const internals = {
  mismatched: null
};

module.exports = function (obj, ref, options) {
  options = Object.assign({
    prototype: true
  }, options);
  return !!internals.isDeepEqual(obj, ref, options, []);
};

internals.isDeepEqual = function (obj, ref, options, seen) {
  if (obj === ref) {
    // Copied from Deep-eql, copyright(c) 2013 Jake Luer, jake@alogicalparadox.com, MIT Licensed, https://github.com/chaijs/deep-eql
    return obj !== 0 || 1 / obj === 1 / ref;
  }

  const type = typeof obj;

  if (type !== typeof ref) {
    return false;
  }

  if (obj === null || ref === null) {
    return false;
  }

  if (type === 'function') {
    if (!options.deepFunction || obj.toString() !== ref.toString()) {
      return false;
    } // Continue as object

  } else if (type !== 'object') {
    return obj !== obj && ref !== ref; // NaN
  }

  const instanceType = internals.getSharedType(obj, ref, !!options.prototype);

  switch (instanceType) {
    case Types.buffer:
      return Buffer && Buffer.prototype.equals.call(obj, ref);
    // $lab:coverage:ignore$

    case Types.promise:
      return obj === ref;

    case Types.regex:
      return obj.toString() === ref.toString();

    case internals.mismatched:
      return false;
  }

  for (let i = seen.length - 1; i >= 0; --i) {
    if (seen[i].isSame(obj, ref)) {
      return true; // If previous comparison failed, it would have stopped execution
    }
  }

  seen.push(new internals.SeenEntry(obj, ref));

  try {
    return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
  } finally {
    seen.pop();
  }
};

internals.getSharedType = function (obj, ref, checkPrototype) {
  if (checkPrototype) {
    if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
      return internals.mismatched;
    }

    return Types.getInternalProto(obj);
  }

  const type = Types.getInternalProto(obj);

  if (type !== Types.getInternalProto(ref)) {
    return internals.mismatched;
  }

  return type;
};

internals.valueOf = function (obj) {
  const objValueOf = obj.valueOf;

  if (objValueOf === undefined) {
    return obj;
  }

  try {
    return objValueOf.call(obj);
  } catch (err) {
    return err;
  }
};

internals.hasOwnEnumerableProperty = function (obj, key) {
  return Object.prototype.propertyIsEnumerable.call(obj, key);
};

internals.isSetSimpleEqual = function (obj, ref) {
  for (const entry of obj) {
    if (!ref.has(entry)) {
      return false;
    }
  }

  return true;
};

internals.isDeepEqualObj = function (instanceType, obj, ref, options, seen) {
  const {
    isDeepEqual,
    valueOf,
    hasOwnEnumerableProperty
  } = internals;
  const {
    keys,
    getOwnPropertySymbols
  } = Object;

  if (instanceType === Types.array) {
    if (options.part) {
      // Check if any index match any other index
      for (const objValue of obj) {
        for (const refValue of ref) {
          if (isDeepEqual(objValue, refValue, options, seen)) {
            return true;
          }
        }
      }
    } else {
      if (obj.length !== ref.length) {
        return false;
      }

      for (let i = 0; i < obj.length; ++i) {
        if (!isDeepEqual(obj[i], ref[i], options, seen)) {
          return false;
        }
      }

      return true;
    }
  } else if (instanceType === Types.set) {
    if (obj.size !== ref.size) {
      return false;
    }

    if (!internals.isSetSimpleEqual(obj, ref)) {
      // Check for deep equality
      const ref2 = new Set(ref);

      for (const objEntry of obj) {
        if (ref2.delete(objEntry)) {
          continue;
        }

        let found = false;

        for (const refEntry of ref2) {
          if (isDeepEqual(objEntry, refEntry, options, seen)) {
            ref2.delete(refEntry);
            found = true;
            break;
          }
        }

        if (!found) {
          return false;
        }
      }
    }
  } else if (instanceType === Types.map) {
    if (obj.size !== ref.size) {
      return false;
    }

    for (const [key, value] of obj) {
      if (value === undefined && !ref.has(key)) {
        return false;
      }

      if (!isDeepEqual(value, ref.get(key), options, seen)) {
        return false;
      }
    }
  } else if (instanceType === Types.error) {
    // Always check name and message
    if (obj.name !== ref.name || obj.message !== ref.message) {
      return false;
    }
  } // Check .valueOf()


  const valueOfObj = valueOf(obj);
  const valueOfRef = valueOf(ref);

  if ((obj !== valueOfObj || ref !== valueOfRef) && !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {
    return false;
  } // Check properties


  const objKeys = keys(obj);

  if (!options.part && objKeys.length !== keys(ref).length && !options.skip) {
    return false;
  }

  let skipped = 0;

  for (const key of objKeys) {
    if (options.skip && options.skip.includes(key)) {
      if (ref[key] === undefined) {
        ++skipped;
      }

      continue;
    }

    if (!hasOwnEnumerableProperty(ref, key)) {
      return false;
    }

    if (!isDeepEqual(obj[key], ref[key], options, seen)) {
      return false;
    }
  }

  if (!options.part && objKeys.length - skipped !== keys(ref).length) {
    return false;
  } // Check symbols


  if (options.symbols !== false) {
    // Defaults to true
    const objSymbols = getOwnPropertySymbols(obj);
    const refSymbols = new Set(getOwnPropertySymbols(ref));

    for (const key of objSymbols) {
      if (!options.skip || !options.skip.includes(key)) {
        if (hasOwnEnumerableProperty(obj, key)) {
          if (!hasOwnEnumerableProperty(ref, key)) {
            return false;
          }

          if (!isDeepEqual(obj[key], ref[key], options, seen)) {
            return false;
          }
        } else if (hasOwnEnumerableProperty(ref, key)) {
          return false;
        }
      }

      refSymbols.delete(key);
    }

    for (const key of refSymbols) {
      if (hasOwnEnumerableProperty(ref, key)) {
        return false;
      }
    }
  }

  return true;
};

internals.SeenEntry = class {
  constructor(obj, ref) {
    this.obj = obj;
    this.ref = ref;
  }

  isSame(obj, ref) {
    return this.obj === obj && this.ref === ref;
  }

};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/error.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/error.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Stringify = __webpack_require__(/*! ./stringify */ "./node_modules/@hapi/hoek/lib/stringify.js");

const internals = {};
module.exports = class extends Error {
  constructor(args) {
    const msgs = args.filter(arg => arg !== '').map(arg => {
      return typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : Stringify(arg);
    });
    super(msgs.join(' ') || 'Unknown error');

    if (typeof Error.captureStackTrace === 'function') {
      // $lab:coverage:ignore$
      Error.captureStackTrace(this, exports.assert);
    }
  }

};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/escapeHtml.js":
/*!***************************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/escapeHtml.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

module.exports = function (input) {
  if (!input) {
    return '';
  }

  let escaped = '';

  for (let i = 0; i < input.length; ++i) {
    const charCode = input.charCodeAt(i);

    if (internals.isSafe(charCode)) {
      escaped += input[i];
    } else {
      escaped += internals.escapeHtmlChar(charCode);
    }
  }

  return escaped;
};

internals.escapeHtmlChar = function (charCode) {
  const namedEscape = internals.namedHtml[charCode];

  if (typeof namedEscape !== 'undefined') {
    return namedEscape;
  }

  if (charCode >= 256) {
    return '&#' + charCode + ';';
  }

  const hexValue = charCode.toString(16).padStart(2, '0');
  return `&#x${hexValue};`;
};

internals.isSafe = function (charCode) {
  return typeof internals.safeCharCodes[charCode] !== 'undefined';
};

internals.namedHtml = {
  '38': '&amp;',
  '60': '&lt;',
  '62': '&gt;',
  '34': '&quot;',
  '160': '&nbsp;',
  '162': '&cent;',
  '163': '&pound;',
  '164': '&curren;',
  '169': '&copy;',
  '174': '&reg;'
};

internals.safeCharCodes = function () {
  const safe = {};

  for (let i = 32; i < 123; ++i) {
    if (i >= 97 || // a-z
    i >= 65 && i <= 90 || // A-Z
    i >= 48 && i <= 57 || // 0-9
    i === 32 || // space
    i === 46 || // .
    i === 44 || // ,
    i === 45 || // -
    i === 58 || // :
    i === 95) {
      // _
      safe[i] = null;
    }
  }

  return safe;
}();

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/escapeRegex.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/escapeRegex.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

module.exports = function (string) {
  // Escape ^$.*+-?=!:|\/()[]{},
  return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/ignore.js":
/*!***********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/ignore.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

module.exports = function () {};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/merge.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/merge.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! ./assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! ./clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/@hapi/hoek/lib/utils.js");

const internals = {};

module.exports = internals.merge = function (target, source, options) {
  Assert(target && typeof target === 'object', 'Invalid target value: must be an object');
  Assert(source === null || source === undefined || typeof source === 'object', 'Invalid source value: must be null, undefined, or an object');

  if (!source) {
    return target;
  }

  options = Object.assign({
    nullOverride: true,
    mergeArrays: true
  }, options);

  if (Array.isArray(source)) {
    Assert(Array.isArray(target), 'Cannot merge array onto an object');

    if (!options.mergeArrays) {
      target.length = 0; // Must not change target assignment
    }

    for (let i = 0; i < source.length; ++i) {
      target.push(Clone(source[i], {
        symbols: options.symbols
      }));
    }

    return target;
  }

  const keys = Utils.keys(source, options);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];

    if (key === '__proto__' || !Object.prototype.propertyIsEnumerable.call(source, key)) {
      continue;
    }

    const value = source[key];

    if (value && typeof value === 'object') {
      if (target[key] === value) {
        continue; // Can occur for shallow merges
      }

      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key]) !== Array.isArray(value) || value instanceof Date || Buffer && Buffer.isBuffer(value) || // $lab:coverage:ignore$
      value instanceof RegExp) {
        target[key] = Clone(value, {
          symbols: options.symbols
        });
      } else {
        internals.merge(target[key], value, options);
      }
    } else {
      if (value !== null && value !== undefined) {
        // Explicit to preserve empty strings
        target[key] = value;
      } else if (options.nullOverride) {
        target[key] = value;
      }
    }
  }

  return target;
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/reach.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/reach.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! ./assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const internals = {};

module.exports = function (obj, chain, options) {
  if (chain === false || chain === null || chain === undefined) {
    return obj;
  }

  options = options || {};

  if (typeof options === 'string') {
    options = {
      separator: options
    };
  }

  const isChainArray = Array.isArray(chain);
  Assert(!isChainArray || !options.separator, 'Separator option no valid for array-based chain');
  const path = isChainArray ? chain : chain.split(options.separator || '.');
  let ref = obj;

  for (let i = 0; i < path.length; ++i) {
    let key = path[i];
    const type = options.iterables && internals.iterables(ref);

    if (Array.isArray(ref) || type === 'set') {
      const number = Number(key);

      if (Number.isInteger(number)) {
        key = number < 0 ? ref.length + number : number;
      }
    }

    if (!ref || typeof ref === 'function' && options.functions === false || // Defaults to true
    !type && ref[key] === undefined) {
      Assert(!options.strict || i + 1 === path.length, 'Missing segment', key, 'in reach path ', chain);
      Assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
      ref = options.default;
      break;
    }

    if (!type) {
      ref = ref[key];
    } else if (type === 'set') {
      ref = [...ref][key];
    } else {
      // type === 'map'
      ref = ref.get(key);
    }
  }

  return ref;
};

internals.iterables = function (ref) {
  if (ref instanceof Set) {
    return 'set';
  }

  if (ref instanceof Map) {
    return 'map';
  }
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/stringify.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/stringify.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

module.exports = function (...args) {
  try {
    return JSON.stringify.apply(null, args);
  } catch (err) {
    return '[Cannot display object: ' + err.message + ']';
  }
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/types.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/types.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};
exports = module.exports = {
  array: Array.prototype,
  buffer: Buffer && Buffer.prototype,
  // $lab:coverage:ignore$
  date: Date.prototype,
  error: Error.prototype,
  generic: Object.prototype,
  map: Map.prototype,
  promise: Promise.prototype,
  regex: RegExp.prototype,
  set: Set.prototype,
  weakMap: WeakMap.prototype,
  weakSet: WeakSet.prototype
};
internals.typeMap = new Map([['[object Error]', exports.error], ['[object Map]', exports.map], ['[object Promise]', exports.promise], ['[object Set]', exports.set], ['[object WeakMap]', exports.weakMap], ['[object WeakSet]', exports.weakSet]]);

exports.getInternalProto = function (obj) {
  if (Array.isArray(obj)) {
    return exports.array;
  }

  if (Buffer && obj instanceof Buffer) {
    // $lab:coverage:ignore$
    return exports.buffer;
  }

  if (obj instanceof Date) {
    return exports.date;
  }

  if (obj instanceof RegExp) {
    return exports.regex;
  }

  if (obj instanceof Error) {
    return exports.error;
  }

  const objName = Object.prototype.toString.call(obj);
  return internals.typeMap.get(objName) || exports.generic;
};

/***/ }),

/***/ "./node_modules/@hapi/hoek/lib/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/hoek/lib/utils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

exports.keys = function (obj, options = {}) {
  return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj); // Defaults to true
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/annotate.js":
/*!************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/annotate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {
  annotations: Symbol('annotations')
};

exports.error = function (stripColorCodes) {
  if (!this._original || typeof this._original !== 'object') {
    return this.details[0].message;
  }

  const redFgEscape = stripColorCodes ? '' : '\u001b[31m';
  const redBgEscape = stripColorCodes ? '' : '\u001b[41m';
  const endColor = stripColorCodes ? '' : '\u001b[0m';
  const obj = Clone(this._original);

  for (let i = this.details.length - 1; i >= 0; --i) {
    // Reverse order to process deepest child first
    const pos = i + 1;
    const error = this.details[i];
    const path = error.path;
    let node = obj;

    for (let j = 0;; ++j) {
      const seg = path[j];

      if (Common.isSchema(node)) {
        node = node.clone(); // joi schemas are not cloned by hoek, we have to take this extra step
      }

      if (j + 1 < path.length && typeof node[seg] !== 'string') {
        node = node[seg];
      } else {
        const refAnnotations = node[internals.annotations] || {
          errors: {},
          missing: {}
        };
        node[internals.annotations] = refAnnotations;
        const cacheKey = seg || error.context.key;

        if (node[seg] !== undefined) {
          refAnnotations.errors[cacheKey] = refAnnotations.errors[cacheKey] || [];
          refAnnotations.errors[cacheKey].push(pos);
        } else {
          refAnnotations.missing[cacheKey] = pos;
        }

        break;
      }
    }
  }

  const replacers = {
    key: /_\$key\$_([, \d]+)_\$end\$_"/g,
    missing: /"_\$miss\$_([^|]+)\|(\d+)_\$end\$_": "__missing__"/g,
    arrayIndex: /\s*"_\$idx\$_([, \d]+)_\$end\$_",?\n(.*)/g,
    specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)]"/g
  };
  let message = internals.safeStringify(obj, 2).replace(replacers.key, ($0, $1) => `" ${redFgEscape}[${$1}]${endColor}`).replace(replacers.missing, ($0, $1, $2) => `${redBgEscape}"${$1}"${endColor}${redFgEscape} [${$2}]: -- missing --${endColor}`).replace(replacers.arrayIndex, ($0, $1, $2) => `\n${$2} ${redFgEscape}[${$1}]${endColor}`).replace(replacers.specials, ($0, $1) => $1);
  message = `${message}\n${redFgEscape}`;

  for (let i = 0; i < this.details.length; ++i) {
    const pos = i + 1;
    message = `${message}\n[${pos}] ${this.details[i].message}`;
  }

  message = message + endColor;
  return message;
}; // Inspired by json-stringify-safe


internals.safeStringify = function (obj, spaces) {
  return JSON.stringify(obj, internals.serializer(), spaces);
};

internals.serializer = function () {
  const keys = [];
  const stack = [];

  const cycleReplacer = (key, value) => {
    if (stack[0] === value) {
      return '[Circular ~]';
    }

    return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
  };

  return function (key, value) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this);

      if (~thisPos) {
        stack.length = thisPos + 1;
        keys.length = thisPos + 1;
        keys[thisPos] = key;
      } else {
        stack.push(this);
        keys.push(key);
      }

      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    if (value) {
      const annotations = value[internals.annotations];

      if (annotations) {
        if (Array.isArray(value)) {
          const annotated = [];

          for (let i = 0; i < value.length; ++i) {
            if (annotations.errors[i]) {
              annotated.push(`_$idx$_${annotations.errors[i].sort().join(', ')}_$end$_`);
            }

            annotated.push(value[i]);
          }

          value = annotated;
        } else {
          for (const errorKey in annotations.errors) {
            value[`${errorKey}_$key$_${annotations.errors[errorKey].sort().join(', ')}_$end$_`] = value[errorKey];
            value[errorKey] = undefined;
          }

          for (const missingKey in annotations.missing) {
            value[`_$miss$_${missingKey}|${annotations.missing[missingKey]}_$end$_`] = '__missing__';
          }
        }

        return value;
      }
    }

    if (value === Infinity || value === -Infinity || Number.isNaN(value) || typeof value === 'function' || typeof value === 'symbol') {
      return '[' + value.toString() + ']';
    }

    return value;
  };
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/base.js":
/*!********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/base.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const DeepEqual = __webpack_require__(/*! @hapi/hoek/lib/deepEqual */ "./node_modules/@hapi/hoek/lib/deepEqual.js");

const Merge = __webpack_require__(/*! @hapi/hoek/lib/merge */ "./node_modules/@hapi/hoek/lib/merge.js");

const Cache = __webpack_require__(/*! ./cache */ "./node_modules/@hapi/joi/lib/cache.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ./compile */ "./node_modules/@hapi/joi/lib/compile.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/joi/lib/errors.js");

const Extend = __webpack_require__(/*! ./extend */ "./node_modules/@hapi/joi/lib/extend.js");

const Manifest = __webpack_require__(/*! ./manifest */ "./node_modules/@hapi/joi/lib/manifest.js");

const Messages = __webpack_require__(/*! ./messages */ "./node_modules/@hapi/joi/lib/messages.js");

const Modify = __webpack_require__(/*! ./modify */ "./node_modules/@hapi/joi/lib/modify.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const Trace = __webpack_require__(/*! ./trace */ "./node_modules/@hapi/joi/lib/trace.js");

const Validator = __webpack_require__(/*! ./validator */ "./node_modules/@hapi/joi/lib/validator.js");

const Values = __webpack_require__(/*! ./values */ "./node_modules/@hapi/joi/lib/values.js");

const internals = {};
internals.Base = class {
  constructor(type) {
    // Naming: public, _private, $_extension, $_mutate{action}
    this.type = type;
    this.$_root = null;
    this._definition = {};
    this._ids = new Modify.Ids();
    this._preferences = null;
    this._refs = new Ref.Manager();
    this._cache = null;
    this._valids = null;
    this._invalids = null;
    this._flags = {};
    this._rules = [];
    this._singleRules = new Map(); // The rule options passed for non-multi rules

    this.$_terms = {}; // Hash of arrays of immutable objects (extended by other types)

    this.$_temp = {
      // Runtime state (not cloned)
      ruleset: null,
      // null: use last, false: error, number: start position
      whens: {} // Runtime cache of generated whens

    };
  } // Manifest


  describe() {
    Assert(typeof Manifest.describe === 'function', 'Manifest functionality disabled');
    return Manifest.describe(this);
  } // Rules


  allow(...values) {
    Common.verifyFlat(values, 'allow');
    return this._values(values, '_valids');
  }

  alter(targets) {
    Assert(targets && typeof targets === 'object' && !Array.isArray(targets), 'Invalid targets argument');
    Assert(!this._inRuleset(), 'Cannot set alterations inside a ruleset');
    const obj = this.clone();
    obj.$_terms.alterations = obj.$_terms.alterations || [];

    for (const target in targets) {
      const adjuster = targets[target];
      Assert(typeof adjuster === 'function', 'Alteration adjuster for', target, 'must be a function');
      obj.$_terms.alterations.push({
        target,
        adjuster
      });
    }

    obj.$_temp.ruleset = false;
    return obj;
  }

  cast(to) {
    Assert(to === false || typeof to === 'string', 'Invalid to value');
    Assert(to === false || this._definition.cast[to], 'Type', this.type, 'does not support casting to', to);
    return this.$_setFlag('cast', to === false ? undefined : to);
  }

  default(value, options) {
    return this._default('default', value, options);
  }

  description(desc) {
    Assert(desc && typeof desc === 'string', 'Description must be a non-empty string');
    return this.$_setFlag('description', desc);
  }

  empty(schema) {
    const obj = this.clone();

    if (schema !== undefined) {
      schema = obj.$_compile(schema, {
        override: false
      });
    }

    return obj.$_setFlag('empty', schema, {
      clone: false
    });
  }

  error(err) {
    Assert(err, 'Missing error');
    Assert(err instanceof Error || typeof err === 'function', 'Must provide a valid Error object or a function');
    return this.$_setFlag('error', err);
  }

  example(example, options = {}) {
    Assert(example !== undefined, 'Missing example');
    Common.assertOptions(options, ['override']);
    return this._inner('examples', example, {
      single: true,
      override: options.override
    });
  }

  external(method, description) {
    if (typeof method === 'object') {
      Assert(!description, 'Cannot combine options with description');
      description = method.description;
      method = method.method;
    }

    Assert(typeof method === 'function', 'Method must be a function');
    Assert(description === undefined || description && typeof description === 'string', 'Description must be a non-empty string');
    return this._inner('externals', {
      method,
      description
    }, {
      single: true
    });
  }

  failover(value, options) {
    return this._default('failover', value, options);
  }

  forbidden() {
    return this.presence('forbidden');
  }

  id(id) {
    if (!id) {
      return this.$_setFlag('id', undefined);
    }

    Assert(typeof id === 'string', 'id must be a non-empty string');
    Assert(/^[^\.]+$/.test(id), 'id cannot contain period character');
    return this.$_setFlag('id', id);
  }

  invalid(...values) {
    return this._values(values, '_invalids');
  }

  label(name) {
    Assert(name && typeof name === 'string', 'Label name must be a non-empty string');
    return this.$_setFlag('label', name);
  }

  meta(meta) {
    Assert(meta !== undefined, 'Meta cannot be undefined');
    return this._inner('metas', meta, {
      single: true
    });
  }

  note(...notes) {
    Assert(notes.length, 'Missing notes');

    for (const note of notes) {
      Assert(note && typeof note === 'string', 'Notes must be non-empty strings');
    }

    return this._inner('notes', notes);
  }

  only(mode = true) {
    Assert(typeof mode === 'boolean', 'Invalid mode:', mode);
    return this.$_setFlag('only', mode);
  }

  optional() {
    return this.presence('optional');
  }

  prefs(prefs) {
    Assert(prefs, 'Missing preferences');
    Assert(prefs.context === undefined, 'Cannot override context');
    Assert(prefs.externals === undefined, 'Cannot override externals');
    Assert(prefs.warnings === undefined, 'Cannot override warnings');
    Assert(prefs.debug === undefined, 'Cannot override debug');
    Common.checkPreferences(prefs);
    const obj = this.clone();
    obj._preferences = Common.preferences(obj._preferences, prefs);
    return obj;
  }

  presence(mode) {
    Assert(['optional', 'required', 'forbidden'].includes(mode), 'Unknown presence mode', mode);
    return this.$_setFlag('presence', mode);
  }

  raw(enabled = true) {
    return this.$_setFlag('result', enabled ? 'raw' : undefined);
  }

  result(mode) {
    Assert(['raw', 'strip'].includes(mode), 'Unknown result mode', mode);
    return this.$_setFlag('result', mode);
  }

  required() {
    return this.presence('required');
  }

  strict(enabled) {
    const obj = this.clone();
    const convert = enabled === undefined ? false : !enabled;
    obj._preferences = Common.preferences(obj._preferences, {
      convert
    });
    return obj;
  }

  strip(enabled = true) {
    return this.$_setFlag('result', enabled ? 'strip' : undefined);
  }

  tag(...tags) {
    Assert(tags.length, 'Missing tags');

    for (const tag of tags) {
      Assert(tag && typeof tag === 'string', 'Tags must be non-empty strings');
    }

    return this._inner('tags', tags);
  }

  unit(name) {
    Assert(name && typeof name === 'string', 'Unit name must be a non-empty string');
    return this.$_setFlag('unit', name);
  }

  valid(...values) {
    Common.verifyFlat(values, 'valid');
    const obj = this.allow(...values);
    obj.$_setFlag('only', !!obj._valids, {
      clone: false
    });
    return obj;
  }

  when(condition, options) {
    const obj = this.clone();

    if (!obj.$_terms.whens) {
      obj.$_terms.whens = [];
    }

    const when = Compile.when(obj, condition, options);

    if (!['any', 'link'].includes(obj.type)) {
      const conditions = when.is ? [when] : when.switch;

      for (const item of conditions) {
        Assert(!item.then || item.then.type === 'any' || item.then.type === obj.type, 'Cannot combine', obj.type, 'with', item.then && item.then.type);
        Assert(!item.otherwise || item.otherwise.type === 'any' || item.otherwise.type === obj.type, 'Cannot combine', obj.type, 'with', item.otherwise && item.otherwise.type);
      }
    }

    obj.$_terms.whens.push(when);
    return obj.$_mutateRebuild();
  } // Helpers


  cache(cache) {
    Assert(!this._inRuleset(), 'Cannot set caching inside a ruleset');
    Assert(!this._cache, 'Cannot override schema cache');
    const obj = this.clone();
    obj._cache = cache || Cache.provider.provision();
    obj.$_temp.ruleset = false;
    return obj;
  }

  clone() {
    const obj = Object.create(Object.getPrototypeOf(this));
    return this._assign(obj);
  }

  concat(source) {
    Assert(Common.isSchema(source), 'Invalid schema object');
    Assert(this.type === 'any' || source.type === 'any' || source.type === this.type, 'Cannot merge type', this.type, 'with another type:', source.type);
    Assert(!this._inRuleset(), 'Cannot concatenate onto a schema with open ruleset');
    Assert(!source._inRuleset(), 'Cannot concatenate a schema with open ruleset');
    let obj = this.clone();

    if (this.type === 'any' && source.type !== 'any') {
      // Change obj to match source type
      const tmpObj = source.clone();

      for (const key of Object.keys(obj)) {
        if (key !== 'type') {
          tmpObj[key] = obj[key];
        }
      }

      obj = tmpObj;
    }

    obj._ids.concat(source._ids);

    obj._refs.register(source, Ref.toSibling);

    obj._preferences = obj._preferences ? Common.preferences(obj._preferences, source._preferences) : source._preferences;
    obj._valids = Values.merge(obj._valids, source._valids, source._invalids);
    obj._invalids = Values.merge(obj._invalids, source._invalids, source._valids); // Remove unique rules present in source

    for (const name of source._singleRules.keys()) {
      if (obj._singleRules.has(name)) {
        obj._rules = obj._rules.filter(target => target.keep || target.name !== name);

        obj._singleRules.delete(name);
      }
    } // Rules


    for (const test of source._rules) {
      if (!source._definition.rules[test.method].multi) {
        obj._singleRules.set(test.name, test);
      }

      obj._rules.push(test);
    } // Flags


    if (obj._flags.empty && source._flags.empty) {
      obj._flags.empty = obj._flags.empty.concat(source._flags.empty);
      const flags = Object.assign({}, source._flags);
      delete flags.empty;
      Merge(obj._flags, flags);
    } else if (source._flags.empty) {
      obj._flags.empty = source._flags.empty;
      const flags = Object.assign({}, source._flags);
      delete flags.empty;
      Merge(obj._flags, flags);
    } else {
      Merge(obj._flags, source._flags);
    } // Terms


    for (const key in source.$_terms) {
      const terms = source.$_terms[key];

      if (!terms) {
        if (!obj.$_terms[key]) {
          obj.$_terms[key] = terms;
        }

        continue;
      }

      if (!obj.$_terms[key]) {
        obj.$_terms[key] = terms.slice();
        continue;
      }

      obj.$_terms[key] = obj.$_terms[key].concat(terms);
    } // Tracing


    if (this.$_root._tracer) {
      this.$_root._tracer._combine(obj, [this, source]);
    } // Rebuild


    return obj.$_mutateRebuild();
  }

  extend(options) {
    Assert(!options.base, 'Cannot extend type with another base');
    return Extend.type(this, options);
  }

  extract(path) {
    path = Array.isArray(path) ? path : path.split('.');
    return this._ids.reach(path);
  }

  fork(paths, adjuster) {
    Assert(!this._inRuleset(), 'Cannot fork inside a ruleset');
    let obj = this; // eslint-disable-line consistent-this

    for (let path of [].concat(paths)) {
      path = Array.isArray(path) ? path : path.split('.');
      obj = obj._ids.fork(path, adjuster, obj);
    }

    obj.$_temp.ruleset = false;
    return obj;
  }

  rule(options) {
    const def = this._definition;
    Common.assertOptions(options, Object.keys(def.modifiers));
    Assert(this.$_temp.ruleset !== false, 'Cannot apply rules to empty ruleset or the last rule added does not support rule properties');
    const start = this.$_temp.ruleset === null ? this._rules.length - 1 : this.$_temp.ruleset;
    Assert(start >= 0 && start < this._rules.length, 'Cannot apply rules to empty ruleset');
    const obj = this.clone();

    for (let i = start; i < obj._rules.length; ++i) {
      const original = obj._rules[i];
      const rule = Clone(original);

      for (const name in options) {
        def.modifiers[name](rule, options[name]);
        Assert(rule.name === original.name, 'Cannot change rule name');
      }

      obj._rules[i] = rule;

      if (obj._singleRules.get(rule.name) === original) {
        obj._singleRules.set(rule.name, rule);
      }
    }

    obj.$_temp.ruleset = false;
    return obj.$_mutateRebuild();
  }

  get ruleset() {
    Assert(!this._inRuleset(), 'Cannot start a new ruleset without closing the previous one');
    const obj = this.clone();
    obj.$_temp.ruleset = obj._rules.length;
    return obj;
  }

  get $() {
    return this.ruleset;
  }

  tailor(targets) {
    targets = [].concat(targets);
    Assert(!this._inRuleset(), 'Cannot tailor inside a ruleset');
    let obj = this; // eslint-disable-line consistent-this

    if (this.$_terms.alterations) {
      for (const {
        target,
        adjuster
      } of this.$_terms.alterations) {
        if (targets.includes(target)) {
          obj = adjuster(obj);
          Assert(Common.isSchema(obj), 'Alteration adjuster for', target, 'failed to return a schema object');
        }
      }
    }

    obj = obj.$_modify({
      each: item => item.tailor(targets),
      ref: false
    });
    obj.$_temp.ruleset = false;
    return obj.$_mutateRebuild();
  }

  tracer() {
    return Trace.location ? Trace.location(this) : this; // $lab:coverage:ignore$
  }

  validate(value, options) {
    return Validator.entry(value, this, options);
  }

  validateAsync(value, options) {
    return Validator.entryAsync(value, this, options);
  } // Extensions


  $_addRule(options) {
    // Normalize rule
    if (typeof options === 'string') {
      options = {
        name: options
      };
    }

    Assert(options && typeof options === 'object', 'Invalid options');
    Assert(options.name && typeof options.name === 'string', 'Invalid rule name');

    for (const key in options) {
      Assert(key[0] !== '_', 'Cannot set private rule properties');
    }

    const rule = Object.assign({}, options); // Shallow cloned

    rule._resolve = [];
    rule.method = rule.method || rule.name;
    const definition = this._definition.rules[rule.method];
    const args = rule.args;
    Assert(definition, 'Unknown rule', rule.method); // Args

    const obj = this.clone();

    if (args) {
      Assert(Object.keys(args).length === 1 || Object.keys(args).length === this._definition.rules[rule.name].args.length, 'Invalid rule definition for', this.type, rule.name);

      for (const key in args) {
        let arg = args[key];

        if (arg === undefined) {
          delete args[key];
          continue;
        }

        if (definition.argsByName) {
          const resolver = definition.argsByName.get(key);

          if (resolver.ref && Common.isResolvable(arg)) {
            rule._resolve.push(key);

            obj.$_mutateRegister(arg);
          } else {
            if (resolver.normalize) {
              arg = resolver.normalize(arg);
              args[key] = arg;
            }

            if (resolver.assert) {
              const error = Common.validateArg(arg, key, resolver);
              Assert(!error, error, 'or reference');
            }
          }
        }

        args[key] = arg;
      }
    } // Unique rules


    if (!definition.multi) {
      obj._ruleRemove(rule.name, {
        clone: false
      });

      obj._singleRules.set(rule.name, rule);
    }

    if (obj.$_temp.ruleset === false) {
      obj.$_temp.ruleset = null;
    }

    if (definition.priority) {
      obj._rules.unshift(rule);
    } else {
      obj._rules.push(rule);
    }

    return obj;
  }

  $_compile(schema, options) {
    return Compile.schema(this.$_root, schema, options);
  }

  $_createError(code, value, local, state, prefs, options = {}) {
    const flags = options.flags !== false ? this._flags : {};
    const messages = options.messages ? Messages.merge(this._definition.messages, options.messages) : this._definition.messages;
    return new Errors.Report(code, value, local, flags, messages, state, prefs);
  }

  $_getFlag(name) {
    return this._flags[name];
  }

  $_getRule(name) {
    return this._singleRules.get(name);
  }

  $_mapLabels(path) {
    path = Array.isArray(path) ? path : path.split('.');
    return this._ids.labels(path);
  }

  $_match(value, state, prefs, overrides) {
    prefs = Object.assign({}, prefs); // Shallow cloned

    prefs.abortEarly = true;
    prefs._externals = false;
    state.snapshot();
    const result = !Validator.validate(value, this, state, prefs, overrides).errors;
    state.restore();
    return result;
  }

  $_modify(options) {
    Common.assertOptions(options, ['each', 'once', 'ref', 'schema']);
    return Modify.schema(this, options) || this;
  }

  $_mutateRebuild() {
    Assert(!this._inRuleset(), 'Cannot add this rule inside a ruleset');

    this._refs.reset();

    this._ids.reset();

    const each = (item, {
      source,
      name,
      path,
      key
    }) => {
      const family = this._definition[source][name] && this._definition[source][name].register;

      if (family !== false) {
        this.$_mutateRegister(item, {
          family,
          key
        });
      }
    };

    this.$_modify({
      each
    });

    if (this._definition.rebuild) {
      this._definition.rebuild(this);
    }

    this.$_temp.ruleset = false;
    return this;
  }

  $_mutateRegister(schema, {
    family,
    key
  } = {}) {
    this._refs.register(schema, family);

    this._ids.register(schema, {
      key
    });
  }

  $_property(name) {
    return this._definition.properties[name];
  }

  $_reach(path) {
    return this._ids.reach(path);
  }

  $_rootReferences() {
    return this._refs.roots();
  }

  $_setFlag(name, value, options = {}) {
    Assert(name[0] === '_' || !this._inRuleset(), 'Cannot set flag inside a ruleset');
    const flag = this._definition.flags[name] || {};

    if (DeepEqual(value, flag.default)) {
      value = undefined;
    }

    if (DeepEqual(value, this._flags[name])) {
      return this;
    }

    const obj = options.clone !== false ? this.clone() : this;

    if (value !== undefined) {
      obj._flags[name] = value;
      obj.$_mutateRegister(value);
    } else {
      delete obj._flags[name];
    }

    if (name[0] !== '_') {
      obj.$_temp.ruleset = false;
    }

    return obj;
  }

  $_validate(value, state, prefs) {
    return Validator.validate(value, this, state, prefs);
  } // Internals


  _assign(target) {
    target.type = this.type;
    target.$_root = this.$_root;
    target.$_temp = Object.assign({}, this.$_temp);
    target.$_temp.whens = {};
    target._ids = this._ids.clone();
    target._preferences = this._preferences;
    target._valids = this._valids && this._valids.clone();
    target._invalids = this._invalids && this._invalids.clone();
    target._rules = this._rules.slice();
    target._singleRules = Clone(this._singleRules, {
      shallow: true
    });
    target._refs = this._refs.clone();
    target._flags = Object.assign({}, this._flags);
    target._cache = null;
    target.$_terms = {};

    for (const key in this.$_terms) {
      target.$_terms[key] = this.$_terms[key] ? this.$_terms[key].slice() : null;
    }

    target.$_super = {};

    for (const override in this.$_super) {
      target.$_super[override] = this._super[override].bind(target);
    }

    return target;
  }

  _default(flag, value, options = {}) {
    Common.assertOptions(options, 'literal');
    Assert(value !== undefined, 'Missing', flag, 'value');
    Assert(typeof value === 'function' || !options.literal, 'Only function value supports literal option');

    if (typeof value === 'function' && options.literal) {
      value = {
        [Common.symbols.literal]: true,
        literal: value
      };
    }

    const obj = this.$_setFlag(flag, value);
    return obj;
  }

  _generate(value, state, prefs) {
    if (!this.$_terms.whens) {
      return {
        schema: this
      };
    } // Collect matching whens


    const whens = [];
    const ids = [];

    for (let i = 0; i < this.$_terms.whens.length; ++i) {
      const when = this.$_terms.whens[i];

      if (when.concat) {
        whens.push(when.concat);
        ids.push(`${i}.concat`);
        continue;
      }

      const input = when.ref ? when.ref.resolve(value, state, prefs) : value;
      const tests = when.is ? [when] : when.switch;
      const before = ids.length;

      for (let j = 0; j < tests.length; ++j) {
        const {
          is,
          then,
          otherwise
        } = tests[j];
        const baseId = `${i}${when.switch ? '.' + j : ''}`;

        if (is.$_match(input, state.nest(is, `${baseId}.is`), prefs)) {
          if (then) {
            const localState = state.localize([...state.path, `${baseId}.then`], state.ancestors, state.schemas);

            const {
              schema: generated,
              id
            } = then._generate(value, localState, prefs);

            whens.push(generated);
            ids.push(`${baseId}.then${id ? `(${id})` : ''}`);
            break;
          }
        } else if (otherwise) {
          const localState = state.localize([...state.path, `${baseId}.otherwise`], state.ancestors, state.schemas);

          const {
            schema: generated,
            id
          } = otherwise._generate(value, localState, prefs);

          whens.push(generated);
          ids.push(`${baseId}.otherwise${id ? `(${id})` : ''}`);
          break;
        }
      }

      if (when.break && ids.length > before) {
        // Something matched
        break;
      }
    } // Check cache


    const id = ids.join(', ');
    state.mainstay.tracer.debug(state, 'rule', 'when', id);

    if (!id) {
      return {
        schema: this
      };
    }

    if (!state.mainstay.tracer.active && this.$_temp.whens[id]) {
      return {
        schema: this.$_temp.whens[id],
        id
      };
    } // Generate dynamic schema


    let obj = this; // eslint-disable-line consistent-this

    if (this._definition.generate) {
      obj = this._definition.generate(this, value, state, prefs);
    } // Apply whens


    for (const when of whens) {
      obj = obj.concat(when);
    } // Tracing


    if (this.$_root._tracer) {
      this.$_root._tracer._combine(obj, [this, ...whens]);
    } // Cache result


    this.$_temp.whens[id] = obj;
    return {
      schema: obj,
      id
    };
  }

  _inner(type, values, options = {}) {
    Assert(!this._inRuleset(), `Cannot set ${type} inside a ruleset`);
    const obj = this.clone();

    if (!obj.$_terms[type] || options.override) {
      obj.$_terms[type] = [];
    }

    if (options.single) {
      obj.$_terms[type].push(values);
    } else {
      obj.$_terms[type].push(...values);
    }

    obj.$_temp.ruleset = false;
    return obj;
  }

  _inRuleset() {
    return this.$_temp.ruleset !== null && this.$_temp.ruleset !== false;
  }

  _ruleRemove(name, options = {}) {
    if (!this._singleRules.has(name)) {
      return this;
    }

    const obj = options.clone !== false ? this.clone() : this;

    obj._singleRules.delete(name);

    const filtered = [];

    for (let i = 0; i < obj._rules.length; ++i) {
      const test = obj._rules[i];

      if (test.name === name && !test.keep) {
        if (obj._inRuleset() && i < obj.$_temp.ruleset) {
          --obj.$_temp.ruleset;
        }

        continue;
      }

      filtered.push(test);
    }

    obj._rules = filtered;
    return obj;
  }

  _values(values, key) {
    Common.verifyFlat(values, key.slice(1, -1));
    const obj = this.clone();
    const override = values[0] === Common.symbols.override;

    if (override) {
      values = values.slice(1);
    }

    if (!obj[key] && values.length) {
      obj[key] = new Values();
    } else if (override) {
      obj[key] = values.length ? new Values() : null;
      obj.$_mutateRebuild();
    }

    if (!obj[key]) {
      return obj;
    }

    if (override) {
      obj[key].override();
    }

    for (const value of values) {
      Assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
      Assert(value !== Common.symbols.override, 'Override must be the first value');
      const other = key === '_invalids' ? '_valids' : '_invalids';

      if (obj[other]) {
        obj[other].remove(value);

        if (!obj[other].length) {
          Assert(key === '_valids' || !obj._flags.only, 'Setting invalid value', value, 'leaves schema rejecting all values due to previous valid rule');
          obj[other] = null;
        }
      }

      obj[key].add(value, obj._refs);
    }

    return obj;
  }

};
internals.Base.prototype[Common.symbols.any] = {
  version: Common.version,
  compile: Compile.compile,
  root: '$_root'
};
internals.Base.prototype.isImmutable = true; // Prevents Hoek from deep cloning schema objects (must be on prototype)
// Aliases

internals.Base.prototype.deny = internals.Base.prototype.invalid;
internals.Base.prototype.disallow = internals.Base.prototype.invalid;
internals.Base.prototype.equal = internals.Base.prototype.valid;
internals.Base.prototype.exist = internals.Base.prototype.required;
internals.Base.prototype.not = internals.Base.prototype.invalid;
internals.Base.prototype.options = internals.Base.prototype.prefs;
internals.Base.prototype.preferences = internals.Base.prototype.prefs;
module.exports = new internals.Base();

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/cache.js":
/*!*********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/cache.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {
  max: 1000,
  supported: new Set(['undefined', 'boolean', 'number', 'string'])
};
exports.provider = {
  provision(options) {
    return new internals.Cache(options);
  }

}; // Least Recently Used (LRU) Cache

internals.Cache = class {
  constructor(options = {}) {
    Common.assertOptions(options, ['max']);
    Assert(options.max === undefined || options.max && options.max > 0 && isFinite(options.max), 'Invalid max cache size');
    this._max = options.max || internals.max;
    this._map = new Map(); // Map of nodes by key

    this._list = new internals.List(); // List of nodes (most recently used in head)
  }

  get length() {
    return this._map.size;
  }

  set(key, value) {
    if (key !== null && !internals.supported.has(typeof key)) {
      return;
    }

    let node = this._map.get(key);

    if (node) {
      node.value = value;

      this._list.first(node);

      return;
    }

    node = this._list.unshift({
      key,
      value
    });

    this._map.set(key, node);

    this._compact();
  }

  get(key) {
    const node = this._map.get(key);

    if (node) {
      this._list.first(node);

      return Clone(node.value);
    }
  }

  _compact() {
    if (this._map.size > this._max) {
      const node = this._list.pop();

      this._map.delete(node.key);
    }
  }

};
internals.List = class {
  constructor() {
    this.tail = null;
    this.head = null;
  }

  unshift(node) {
    node.next = null;
    node.prev = this.head;

    if (this.head) {
      this.head.next = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return node;
  }

  first(node) {
    if (node === this.head) {
      return;
    }

    this._remove(node);

    this.unshift(node);
  }

  pop() {
    return this._remove(this.tail);
  }

  _remove(node) {
    const {
      next,
      prev
    } = node;
    next.prev = prev;

    if (prev) {
      prev.next = next;
    }

    if (node === this.tail) {
      this.tail = next;
    }

    node.prev = null;
    node.next = null;
    return node;
  }

};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/common.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/common.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const AssertError = __webpack_require__(/*! @hapi/hoek/lib/error */ "./node_modules/@hapi/hoek/lib/error.js");

const Pkg = __webpack_require__(/*! ../package.json */ "./node_modules/@hapi/joi/package.json");

let Messages;
let Schemas;
const internals = {
  isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/
};
exports.version = Pkg.version;
exports.defaults = {
  abortEarly: true,
  allowUnknown: false,
  cache: true,
  context: null,
  convert: true,
  dateFormat: 'iso',
  errors: {
    escapeHtml: false,
    label: 'path',
    language: null,
    render: true,
    stack: false,
    wrap: {
      label: '"',
      array: '[]'
    }
  },
  externals: true,
  messages: {},
  nonEnumerables: false,
  noDefaults: false,
  presence: 'optional',
  skipFunctions: false,
  stripUnknown: false,
  warnings: false
};
exports.symbols = {
  any: Symbol.for('@hapi/joi/schema'),
  // Used to internally identify any-based types (shared with other joi versions)
  arraySingle: Symbol('arraySingle'),
  deepDefault: Symbol('deepDefault'),
  literal: Symbol('literal'),
  override: Symbol('override'),
  prefs: Symbol('prefs'),
  ref: Symbol('ref'),
  values: Symbol('values'),
  template: Symbol('template')
};

exports.assertOptions = function (options, keys, name = 'Options') {
  Assert(options && typeof options === 'object' && !Array.isArray(options), 'Options must be of type object');
  const unknownKeys = Object.keys(options).filter(k => !keys.includes(k));
  Assert(unknownKeys.length === 0, `${name} contain unknown keys: ${unknownKeys}`);
};

exports.checkPreferences = function (prefs) {
  Schemas = Schemas || __webpack_require__(/*! ./schemas */ "./node_modules/@hapi/joi/lib/schemas.js");
  const result = Schemas.preferences.validate(prefs);

  if (result.error) {
    throw new AssertError([result.error.details[0].message]);
  }
};

exports.compare = function (a, b, operator) {
  switch (operator) {
    case '=':
      return a === b;

    case '>':
      return a > b;

    case '<':
      return a < b;

    case '>=':
      return a >= b;

    case '<=':
      return a <= b;
  }
};

exports.default = function (value, defaultValue) {
  return value === undefined ? defaultValue : value;
};

exports.isIsoDate = function (date) {
  return internals.isoDate.test(date);
};

exports.isNumber = function (value) {
  return typeof value === 'number' && !isNaN(value);
};

exports.isResolvable = function (obj) {
  if (!obj) {
    return false;
  }

  return obj[exports.symbols.ref] || obj[exports.symbols.template];
};

exports.isSchema = function (schema, options = {}) {
  const any = schema && schema[exports.symbols.any];

  if (!any) {
    return false;
  }

  Assert(options.legacy || any.version === exports.version, 'Cannot mix different versions of joi schemas');
  return true;
};

exports.isValues = function (obj) {
  return obj[exports.symbols.values];
};

exports.limit = function (value) {
  return Number.isSafeInteger(value) && value >= 0;
};

exports.preferences = function (target, source) {
  Messages = Messages || __webpack_require__(/*! ./messages */ "./node_modules/@hapi/joi/lib/messages.js");
  target = target || {};
  source = source || {};
  const merged = Object.assign({}, target, source);

  if (source.errors && target.errors) {
    merged.errors = Object.assign({}, target.errors, source.errors);
    merged.errors.wrap = Object.assign({}, target.errors.wrap, source.errors.wrap);
  }

  if (source.messages) {
    merged.messages = Messages.compile(source.messages, target.messages);
  }

  delete merged[exports.symbols.prefs];
  return merged;
};

exports.tryWithPath = function (fn, key, options = {}) {
  try {
    return fn();
  } catch (err) {
    if (err.path !== undefined) {
      err.path = key + '.' + err.path;
    } else {
      err.path = key;
    }

    if (options.append) {
      err.message = `${err.message} (${err.path})`;
    }

    throw err;
  }
};

exports.validateArg = function (value, label, {
  assert,
  message
}) {
  if (exports.isSchema(assert)) {
    const result = assert.validate(value);

    if (!result.error) {
      return;
    }

    return result.error.message;
  } else if (!assert(value)) {
    return label ? `${label} ${message}` : message;
  }
};

exports.verifyFlat = function (args, method) {
  for (const arg of args) {
    Assert(!Array.isArray(arg), 'Method no longer accepts array arguments:', method);
  }
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/compile.js":
/*!***********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/compile.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const internals = {};

exports.schema = function (Joi, config, options = {}) {
  Common.assertOptions(options, ['appendPath', 'override']);

  try {
    return internals.schema(Joi, config, options);
  } catch (err) {
    if (options.appendPath && err.path !== undefined) {
      err.message = `${err.message} (${err.path})`;
    }

    throw err;
  }
};

internals.schema = function (Joi, config, options) {
  Assert(config !== undefined, 'Invalid undefined schema');

  if (Array.isArray(config)) {
    Assert(config.length, 'Invalid empty array schema');

    if (config.length === 1) {
      config = config[0];
    }
  }

  const valid = (base, ...values) => {
    if (options.override !== false) {
      return base.valid(Joi.override, ...values);
    }

    return base.valid(...values);
  };

  if (internals.simple(config)) {
    return valid(Joi, config);
  }

  if (typeof config === 'function') {
    return Joi.custom(config);
  }

  Assert(typeof config === 'object', 'Invalid schema content:', typeof config);

  if (Common.isResolvable(config)) {
    return valid(Joi, config);
  }

  if (Common.isSchema(config)) {
    return config;
  }

  if (Array.isArray(config)) {
    for (const item of config) {
      if (!internals.simple(item)) {
        return Joi.alternatives().try(...config);
      }
    }

    return valid(Joi, ...config);
  }

  if (config instanceof RegExp) {
    return Joi.string().regex(config);
  }

  if (config instanceof Date) {
    return valid(Joi.date(), config);
  }

  Assert(Object.getPrototypeOf(config) === Object.getPrototypeOf({}), 'Schema can only contain plain objects');
  return Joi.object().keys(config);
};

exports.ref = function (id, options) {
  return Ref.isRef(id) ? id : Ref.create(id, options);
};

exports.compile = function (root, schema, options = {}) {
  Common.assertOptions(options, ['legacy']); // Compiled by any supported version

  const any = schema && schema[Common.symbols.any];

  if (any) {
    Assert(options.legacy || any.version === Common.version, 'Cannot mix different versions of joi schemas:', any.version, Common.version);
    return schema;
  } // Uncompiled root


  if (typeof schema !== 'object' || !options.legacy) {
    return exports.schema(root, schema, {
      appendPath: true
    }); // Will error if schema contains other versions
  } // Scan schema for compiled parts


  const compiler = internals.walk(schema);

  if (!compiler) {
    return exports.schema(root, schema, {
      appendPath: true
    });
  }

  return compiler.compile(compiler.root, schema);
};

internals.walk = function (schema) {
  if (typeof schema !== 'object') {
    return null;
  }

  if (Array.isArray(schema)) {
    for (const item of schema) {
      const compiler = internals.walk(item);

      if (compiler) {
        return compiler;
      }
    }

    return null;
  }

  const any = schema[Common.symbols.any];

  if (any) {
    return {
      root: schema[any.root],
      compile: any.compile
    };
  }

  Assert(Object.getPrototypeOf(schema) === Object.getPrototypeOf({}), 'Schema can only contain plain objects');

  for (const key in schema) {
    const compiler = internals.walk(schema[key]);

    if (compiler) {
      return compiler;
    }
  }

  return null;
};

internals.simple = function (value) {
  return value === null || ['boolean', 'string', 'number'].includes(typeof value);
};

exports.when = function (schema, condition, options) {
  if (options === undefined) {
    Assert(condition && typeof condition === 'object', 'Missing options');
    options = condition;
    condition = Ref.create('.');
  }

  if (Array.isArray(options)) {
    options = {
      switch: options
    };
  }

  Common.assertOptions(options, ['is', 'not', 'then', 'otherwise', 'switch', 'break']); // Schema condition

  if (Common.isSchema(condition)) {
    Assert(options.is === undefined, '"is" can not be used with a schema condition');
    Assert(options.not === undefined, '"not" can not be used with a schema condition');
    Assert(options.switch === undefined, '"switch" can not be used with a schema condition');
    return internals.condition(schema, {
      is: condition,
      then: options.then,
      otherwise: options.otherwise,
      break: options.break
    });
  } // Single condition


  Assert(Ref.isRef(condition) || typeof condition === 'string', 'Invalid condition:', condition);
  Assert(options.not === undefined || options.is === undefined, 'Cannot combine "is" with "not"');

  if (options.switch === undefined) {
    let rule = options;

    if (options.not !== undefined) {
      rule = {
        is: options.not,
        then: options.otherwise,
        otherwise: options.then,
        break: options.break
      };
    }

    let is = rule.is !== undefined ? schema.$_compile(rule.is) : schema.$_root.invalid(null, false, 0, '').required();
    Assert(rule.then !== undefined || rule.otherwise !== undefined, 'options must have at least one of "then", "otherwise", or "switch"');
    Assert(rule.break === undefined || rule.then === undefined || rule.otherwise === undefined, 'Cannot specify then, otherwise, and break all together');

    if (options.is !== undefined && !Ref.isRef(options.is) && !Common.isSchema(options.is)) {
      is = is.required(); // Only apply required if this wasn't already a schema or a ref
    }

    return internals.condition(schema, {
      ref: exports.ref(condition),
      is,
      then: rule.then,
      otherwise: rule.otherwise,
      break: rule.break
    });
  } // Switch statement


  Assert(Array.isArray(options.switch), '"switch" must be an array');
  Assert(options.is === undefined, 'Cannot combine "switch" with "is"');
  Assert(options.not === undefined, 'Cannot combine "switch" with "not"');
  Assert(options.then === undefined, 'Cannot combine "switch" with "then"');
  const rule = {
    ref: exports.ref(condition),
    switch: [],
    break: options.break
  };

  for (let i = 0; i < options.switch.length; ++i) {
    const test = options.switch[i];
    const last = i === options.switch.length - 1;
    Common.assertOptions(test, last ? ['is', 'then', 'otherwise'] : ['is', 'then']);
    Assert(test.is !== undefined, 'Switch statement missing "is"');
    Assert(test.then !== undefined, 'Switch statement missing "then"');
    const item = {
      is: schema.$_compile(test.is),
      then: schema.$_compile(test.then)
    };

    if (!Ref.isRef(test.is) && !Common.isSchema(test.is)) {
      item.is = item.is.required(); // Only apply required if this wasn't already a schema or a ref
    }

    if (last) {
      Assert(options.otherwise === undefined || test.otherwise === undefined, 'Cannot specify "otherwise" inside and outside a "switch"');
      const otherwise = options.otherwise !== undefined ? options.otherwise : test.otherwise;

      if (otherwise !== undefined) {
        Assert(rule.break === undefined, 'Cannot specify both otherwise and break');
        item.otherwise = schema.$_compile(otherwise);
      }
    }

    rule.switch.push(item);
  }

  return rule;
};

internals.condition = function (schema, condition) {
  for (const key of ['then', 'otherwise']) {
    if (condition[key] === undefined) {
      delete condition[key];
    } else {
      condition[key] = schema.$_compile(condition[key]);
    }
  }

  return condition;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/errors.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/errors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Annotate = __webpack_require__(/*! ./annotate */ "./node_modules/@hapi/joi/lib/annotate.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Template = __webpack_require__(/*! ./template */ "./node_modules/@hapi/joi/lib/template.js");

const internals = {};
exports.Report = class {
  constructor(code, value, local, flags, messages, state, prefs) {
    this.code = code;
    this.flags = flags;
    this.messages = messages;
    this.path = state.path;
    this.prefs = prefs;
    this.state = state;
    this.value = value;
    this.message = null;
    this.template = null;
    this.local = local || {};
    this.local.label = exports.label(this.flags, this.state, this.prefs, this.messages);

    if (this.value !== undefined && !this.local.hasOwnProperty('value')) {
      this.local.value = this.value;
    }

    if (this.path.length) {
      const key = this.path[this.path.length - 1];

      if (typeof key !== 'object') {
        this.local.key = key;
      }
    }
  }

  _setTemplate(template) {
    this.template = template;

    if (!this.flags.label && this.path.length === 0) {
      const localized = this._template(this.template, 'root');

      if (localized) {
        this.local.label = localized;
      }
    }
  }

  toString() {
    if (this.message) {
      return this.message;
    }

    const code = this.code;

    if (!this.prefs.errors.render) {
      return this.code;
    }

    const template = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);

    if (template === undefined) {
      return `Error code "${code}" is not defined, your custom type is missing the correct messages definition`;
    } // Render and cache result


    this.message = template.render(this.value, this.state, this.prefs, this.local, {
      errors: this.prefs.errors,
      messages: [this.prefs.messages, this.messages]
    });

    if (!this.prefs.errors.label) {
      this.message = this.message.replace(/^"" /, '').trim();
    }

    return this.message;
  }

  _template(messages, code) {
    return exports.template(this.value, messages, code || this.code, this.state, this.prefs);
  }

};

exports.path = function (path) {
  let label = '';

  for (const segment of path) {
    if (typeof segment === 'object') {
      // Exclude array single path segment
      continue;
    }

    if (typeof segment === 'string') {
      if (label) {
        label += '.';
      }

      label += segment;
    } else {
      label += `[${segment}]`;
    }
  }

  return label;
};

exports.template = function (value, messages, code, state, prefs) {
  if (!messages) {
    return;
  }

  if (Template.isTemplate(messages)) {
    return code !== 'root' ? messages : null;
  }

  let lang = prefs.errors.language;

  if (Common.isResolvable(lang)) {
    lang = lang.resolve(value, state, prefs);
  }

  if (lang && messages[lang] && messages[lang][code] !== undefined) {
    return messages[lang][code];
  }

  return messages[code];
};

exports.label = function (flags, state, prefs, messages) {
  if (flags.label) {
    return flags.label;
  }

  if (!prefs.errors.label) {
    return '';
  }

  let path = state.path;

  if (prefs.errors.label === 'key' && state.path.length > 1) {
    path = state.path.slice(-1);
  }

  const normalized = exports.path(path);

  if (normalized) {
    return normalized;
  }

  return exports.template(null, prefs.messages, 'root', state, prefs) || messages && exports.template(null, messages, 'root', state, prefs) || 'value';
};

exports.process = function (errors, original, prefs) {
  if (!errors) {
    return null;
  }

  const {
    override,
    message,
    details
  } = exports.details(errors);

  if (override) {
    return override;
  }

  if (prefs.errors.stack) {
    return new exports.ValidationError(message, details, original);
  }

  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const validationError = new exports.ValidationError(message, details, original);
  Error.stackTraceLimit = limit;
  return validationError;
};

exports.details = function (errors, options = {}) {
  let messages = [];
  const details = [];

  for (const item of errors) {
    // Override
    if (item instanceof Error) {
      if (options.override !== false) {
        return {
          override: item
        };
      }

      const message = item.toString();
      messages.push(message);
      details.push({
        message,
        type: 'override',
        context: {
          error: item
        }
      });
      continue;
    } // Report


    const message = item.toString();
    messages.push(message);
    details.push({
      message,
      path: item.path.filter(v => typeof v !== 'object'),
      type: item.code,
      context: item.local
    });
  }

  if (messages.length > 1) {
    messages = [...new Set(messages)];
  }

  return {
    message: messages.join('. '),
    details
  };
};

exports.ValidationError = class extends Error {
  constructor(message, details, original) {
    super(message);
    this._original = original;
    this.details = details;
  }

  static isError(err) {
    return err instanceof exports.ValidationError;
  }

};
exports.ValidationError.prototype.isJoi = true;
exports.ValidationError.prototype.name = 'ValidationError';
exports.ValidationError.prototype.annotate = Annotate.error;

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/extend.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/extend.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Messages = __webpack_require__(/*! ./messages */ "./node_modules/@hapi/joi/lib/messages.js");

const internals = {};

exports.type = function (from, options) {
  const base = Object.getPrototypeOf(from);
  const prototype = Clone(base);

  const schema = from._assign(Object.create(prototype));

  const def = Object.assign({}, options); // Shallow cloned

  delete def.base;
  prototype._definition = def;
  const parent = base._definition || {};
  def.messages = Messages.merge(parent.messages, def.messages);
  def.properties = Object.assign({}, parent.properties, def.properties); // Type

  schema.type = def.type; // Flags

  def.flags = Object.assign({}, parent.flags, def.flags); // Terms

  const terms = Object.assign({}, parent.terms);

  if (def.terms) {
    for (const name in def.terms) {
      // Only apply own terms
      const term = def.terms[name];
      Assert(schema.$_terms[name] === undefined, 'Invalid term override for', def.type, name);
      schema.$_terms[name] = term.init;
      terms[name] = term;
    }
  }

  def.terms = terms; // Constructor arguments

  if (!def.args) {
    def.args = parent.args;
  } // Prepare


  def.prepare = internals.prepare(def.prepare, parent.prepare); // Coerce

  if (def.coerce) {
    if (typeof def.coerce === 'function') {
      def.coerce = {
        method: def.coerce
      };
    }

    if (def.coerce.from && !Array.isArray(def.coerce.from)) {
      def.coerce = {
        method: def.coerce.method,
        from: [].concat(def.coerce.from)
      };
    }
  }

  def.coerce = internals.coerce(def.coerce, parent.coerce); // Validate

  def.validate = internals.validate(def.validate, parent.validate); // Rules

  const rules = Object.assign({}, parent.rules);

  if (def.rules) {
    for (const name in def.rules) {
      const rule = def.rules[name];
      Assert(typeof rule === 'object', 'Invalid rule definition for', def.type, name);
      let method = rule.method;

      if (method === undefined) {
        method = function () {
          return this.$_addRule(name);
        };
      }

      if (method) {
        Assert(!prototype[name], 'Rule conflict in', def.type, name);
        prototype[name] = method;
      }

      Assert(!rules[name], 'Rule conflict in', def.type, name);
      rules[name] = rule;

      if (rule.alias) {
        const aliases = [].concat(rule.alias);

        for (const alias of aliases) {
          prototype[alias] = rule.method;
        }
      }

      if (rule.args) {
        rule.argsByName = new Map();
        rule.args = rule.args.map(arg => {
          if (typeof arg === 'string') {
            arg = {
              name: arg
            };
          }

          Assert(!rule.argsByName.has(arg.name), 'Duplicated argument name', arg.name);

          if (Common.isSchema(arg.assert)) {
            arg.assert = arg.assert.strict().label(arg.name);
          }

          rule.argsByName.set(arg.name, arg);
          return arg;
        });
      }
    }
  }

  def.rules = rules; // Modifiers

  const modifiers = Object.assign({}, parent.modifiers);

  if (def.modifiers) {
    for (const name in def.modifiers) {
      Assert(!prototype[name], 'Rule conflict in', def.type, name);
      const modifier = def.modifiers[name];
      Assert(typeof modifier === 'function', 'Invalid modifier definition for', def.type, name);

      const method = function (arg) {
        return this.rule({
          [name]: arg
        });
      };

      prototype[name] = method;
      modifiers[name] = modifier;
    }
  }

  def.modifiers = modifiers; // Overrides

  if (def.overrides) {
    prototype._super = base;
    schema.$_super = {};

    for (const override in def.overrides) {
      Assert(base[override], 'Cannot override missing', override);
      schema.$_super[override] = base[override].bind(schema);
    }

    Object.assign(prototype, def.overrides);
  } // Casts


  def.cast = Object.assign({}, parent.cast, def.cast); // Manifest

  const manifest = Object.assign({}, parent.manifest, def.manifest);
  manifest.build = internals.build(def.manifest && def.manifest.build, parent.manifest && parent.manifest.build);
  def.manifest = manifest; // Rebuild

  def.rebuild = internals.rebuild(def.rebuild, parent.rebuild);
  return schema;
}; // Helpers


internals.build = function (child, parent) {
  if (!child || !parent) {
    return child || parent;
  }

  return function (obj, desc) {
    return parent(child(obj, desc), desc);
  };
};

internals.coerce = function (child, parent) {
  if (!child || !parent) {
    return child || parent;
  }

  return {
    from: child.from && parent.from ? [...new Set([...child.from, ...parent.from])] : null,

    method(value, helpers) {
      let coerced;

      if (!parent.from || parent.from.includes(typeof value)) {
        coerced = parent.method(value, helpers);

        if (coerced) {
          if (coerced.errors || coerced.value === undefined) {
            return coerced;
          }

          value = coerced.value;
        }
      }

      if (!child.from || child.from.includes(typeof value)) {
        const own = child.method(value, helpers);

        if (own) {
          return own;
        }
      }

      return coerced;
    }

  };
};

internals.prepare = function (child, parent) {
  if (!child || !parent) {
    return child || parent;
  }

  return function (value, helpers) {
    const prepared = child(value, helpers);

    if (prepared) {
      if (prepared.errors || prepared.value === undefined) {
        return prepared;
      }

      value = prepared.value;
    }

    return parent(value, helpers) || prepared;
  };
};

internals.rebuild = function (child, parent) {
  if (!child || !parent) {
    return child || parent;
  }

  return function (schema) {
    parent(schema);
    child(schema);
  };
};

internals.validate = function (child, parent) {
  if (!child || !parent) {
    return child || parent;
  }

  return function (value, helpers) {
    const result = parent(value, helpers);

    if (result) {
      if (result.errors && (!Array.isArray(result.errors) || result.errors.length)) {
        return result;
      }

      value = result.value;
    }

    return child(value, helpers) || result;
  };
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Cache = __webpack_require__(/*! ./cache */ "./node_modules/@hapi/joi/lib/cache.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ./compile */ "./node_modules/@hapi/joi/lib/compile.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/joi/lib/errors.js");

const Extend = __webpack_require__(/*! ./extend */ "./node_modules/@hapi/joi/lib/extend.js");

const Manifest = __webpack_require__(/*! ./manifest */ "./node_modules/@hapi/joi/lib/manifest.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const Template = __webpack_require__(/*! ./template */ "./node_modules/@hapi/joi/lib/template.js");

const Trace = __webpack_require__(/*! ./trace */ "./node_modules/@hapi/joi/lib/trace.js");

let Schemas;
const internals = {
  types: {
    alternatives: __webpack_require__(/*! ./types/alternatives */ "./node_modules/@hapi/joi/lib/types/alternatives.js"),
    any: __webpack_require__(/*! ./types/any */ "./node_modules/@hapi/joi/lib/types/any.js"),
    array: __webpack_require__(/*! ./types/array */ "./node_modules/@hapi/joi/lib/types/array.js"),
    boolean: __webpack_require__(/*! ./types/boolean */ "./node_modules/@hapi/joi/lib/types/boolean.js"),
    date: __webpack_require__(/*! ./types/date */ "./node_modules/@hapi/joi/lib/types/date.js"),
    function: __webpack_require__(/*! ./types/function */ "./node_modules/@hapi/joi/lib/types/function.js"),
    link: __webpack_require__(/*! ./types/link */ "./node_modules/@hapi/joi/lib/types/link.js"),
    number: __webpack_require__(/*! ./types/number */ "./node_modules/@hapi/joi/lib/types/number.js"),
    object: __webpack_require__(/*! ./types/object */ "./node_modules/@hapi/joi/lib/types/object.js"),
    string: __webpack_require__(/*! ./types/string */ "./node_modules/@hapi/joi/lib/types/string.js"),
    symbol: __webpack_require__(/*! ./types/symbol */ "./node_modules/@hapi/joi/lib/types/symbol.js")
  },
  aliases: {
    alt: 'alternatives',
    bool: 'boolean',
    func: 'function'
  }
};

if (Buffer) {
  // $lab:coverage:ignore$
  internals.types.binary = __webpack_require__(/*! ./types/binary */ "./node_modules/@hapi/joi/lib/types/binary.js");
}

internals.root = function () {
  const root = {
    _types: new Set(Object.keys(internals.types))
  }; // Types

  for (const type of root._types) {
    root[type] = function (...args) {
      Assert(!args.length || ['alternatives', 'link', 'object'].includes(type), 'The', type, 'type does not allow arguments');
      return internals.generate(this, internals.types[type], args);
    };
  } // Shortcuts


  for (const method of ['allow', 'custom', 'disallow', 'equal', 'exist', 'forbidden', 'invalid', 'not', 'only', 'optional', 'options', 'prefs', 'preferences', 'required', 'strip', 'valid', 'when']) {
    root[method] = function (...args) {
      return this.any()[method](...args);
    };
  } // Methods


  Object.assign(root, internals.methods); // Aliases

  for (const alias in internals.aliases) {
    const target = internals.aliases[alias];
    root[alias] = root[target];
  }

  root.x = root.expression; // Trace

  if (Trace.setup) {
    // $lab:coverage:ignore$
    Trace.setup(root);
  }

  return root;
};

internals.methods = {
  ValidationError: Errors.ValidationError,
  version: Common.version,
  cache: Cache.provider,

  assert(value, schema, ...args
  /* [message], [options] */
  ) {
    internals.assert(value, schema, true, args);
  },

  attempt(value, schema, ...args
  /* [message], [options] */
  ) {
    return internals.assert(value, schema, false, args);
  },

  build(desc) {
    Assert(typeof Manifest.build === 'function', 'Manifest functionality disabled');
    return Manifest.build(this, desc);
  },

  checkPreferences(prefs) {
    Common.checkPreferences(prefs);
  },

  compile(schema, options) {
    return Compile.compile(this, schema, options);
  },

  defaults(modifier) {
    Assert(typeof modifier === 'function', 'modifier must be a function');
    const joi = Object.assign({}, this);

    for (const type of joi._types) {
      const schema = modifier(joi[type]());
      Assert(Common.isSchema(schema), 'modifier must return a valid schema object');

      joi[type] = function (...args) {
        return internals.generate(this, schema, args);
      };
    }

    return joi;
  },

  expression(...args) {
    return new Template(...args);
  },

  extend(...extensions) {
    Common.verifyFlat(extensions, 'extend');
    Schemas = Schemas || __webpack_require__(/*! ./schemas */ "./node_modules/@hapi/joi/lib/schemas.js");
    Assert(extensions.length, 'You need to provide at least one extension');
    this.assert(extensions, Schemas.extensions);
    const joi = Object.assign({}, this);
    joi._types = new Set(joi._types);

    for (let extension of extensions) {
      if (typeof extension === 'function') {
        extension = extension(joi);
      }

      this.assert(extension, Schemas.extension);
      const expanded = internals.expandExtension(extension, joi);

      for (const item of expanded) {
        Assert(joi[item.type] === undefined || joi._types.has(item.type), 'Cannot override name', item.type);
        const base = item.base || this.any();
        const schema = Extend.type(base, item);

        joi._types.add(item.type);

        joi[item.type] = function (...args) {
          return internals.generate(this, schema, args);
        };
      }
    }

    return joi;
  },

  isError: Errors.ValidationError.isError,
  isExpression: Template.isTemplate,
  isRef: Ref.isRef,
  isSchema: Common.isSchema,

  in(...args) {
    return Ref.in(...args);
  },

  override: Common.symbols.override,

  ref(...args) {
    return Ref.create(...args);
  },

  types() {
    const types = {};

    for (const type of this._types) {
      types[type] = this[type]();
    }

    for (const target in internals.aliases) {
      types[target] = this[target]();
    }

    return types;
  }

}; // Helpers

internals.assert = function (value, schema, annotate, args
/* [message], [options] */
) {
  const message = args[0] instanceof Error || typeof args[0] === 'string' ? args[0] : null;
  const options = message ? args[1] : args[0];
  const result = schema.validate(value, Common.preferences({
    errors: {
      stack: true
    }
  }, options || {}));
  let error = result.error;

  if (!error) {
    return result.value;
  }

  if (message instanceof Error) {
    throw message;
  }

  const display = annotate && typeof error.annotate === 'function' ? error.annotate() : error.message;

  if (error instanceof Errors.ValidationError === false) {
    error = Clone(error);
  }

  error.message = message ? `${message} ${display}` : display;
  throw error;
};

internals.generate = function (root, schema, args) {
  Assert(root, 'Must be invoked on a Joi instance.');
  schema.$_root = root;

  if (!schema._definition.args || !args.length) {
    return schema;
  }

  return schema._definition.args(schema, ...args);
};

internals.expandExtension = function (extension, joi) {
  if (typeof extension.type === 'string') {
    return [extension];
  }

  const extended = [];

  for (const type of joi._types) {
    if (extension.type.test(type)) {
      const item = Object.assign({}, extension);
      item.type = type;
      item.base = joi[type]();
      extended.push(item);
    }
  }

  return extended;
};

module.exports = internals.root();

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/manifest.js":
/*!************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/manifest.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Messages = __webpack_require__(/*! ./messages */ "./node_modules/@hapi/joi/lib/messages.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const Template = __webpack_require__(/*! ./template */ "./node_modules/@hapi/joi/lib/template.js");

let Schemas;
const internals = {};

exports.describe = function (schema) {
  const def = schema._definition; // Type

  const desc = {
    type: schema.type,
    flags: {},
    rules: []
  }; // Flags

  for (const flag in schema._flags) {
    if (flag[0] !== '_') {
      desc.flags[flag] = internals.describe(schema._flags[flag]);
    }
  }

  if (!Object.keys(desc.flags).length) {
    delete desc.flags;
  } // Preferences


  if (schema._preferences) {
    desc.preferences = Clone(schema._preferences, {
      shallow: ['messages']
    });
    delete desc.preferences[Common.symbols.prefs];

    if (desc.preferences.messages) {
      desc.preferences.messages = Messages.decompile(desc.preferences.messages);
    }
  } // Allow / Invalid


  if (schema._valids) {
    desc.allow = schema._valids.describe();
  }

  if (schema._invalids) {
    desc.invalid = schema._invalids.describe();
  } // Rules


  for (const rule of schema._rules) {
    const ruleDef = def.rules[rule.name];

    if (ruleDef.manifest === false) {
      // Defaults to true
      continue;
    }

    const item = {
      name: rule.name
    };

    for (const custom in def.modifiers) {
      if (rule[custom] !== undefined) {
        item[custom] = internals.describe(rule[custom]);
      }
    }

    if (rule.args) {
      item.args = {};

      for (const key in rule.args) {
        const arg = rule.args[key];

        if (key === 'options' && !Object.keys(arg).length) {
          continue;
        }

        item.args[key] = internals.describe(arg, {
          assign: key
        });
      }

      if (!Object.keys(item.args).length) {
        delete item.args;
      }
    }

    desc.rules.push(item);
  }

  if (!desc.rules.length) {
    delete desc.rules;
  } // Terms (must be last to verify no name conflicts)


  for (const term in schema.$_terms) {
    if (term[0] === '_') {
      continue;
    }

    Assert(!desc[term], 'Cannot describe schema due to internal name conflict with', term);
    const items = schema.$_terms[term];

    if (!items) {
      continue;
    }

    if (items instanceof Map) {
      if (items.size) {
        desc[term] = [...items.entries()];
      }

      continue;
    }

    if (Common.isValues(items)) {
      desc[term] = items.describe();
      continue;
    }

    Assert(def.terms[term], 'Term', term, 'missing configuration');
    const manifest = def.terms[term].manifest;
    const mapped = typeof manifest === 'object';

    if (!items.length && !mapped) {
      continue;
    }

    const normalized = [];

    for (const item of items) {
      normalized.push(internals.describe(item));
    } // Mapped


    if (mapped) {
      const {
        from,
        to
      } = manifest.mapped;
      desc[term] = {};

      for (const item of normalized) {
        desc[term][item[to]] = item[from];
      }

      continue;
    } // Single


    if (manifest === 'single') {
      Assert(normalized.length === 1, 'Term', term, 'contains more than one item');
      desc[term] = normalized[0];
      continue;
    } // Array


    desc[term] = normalized;
  }

  internals.validate(schema.$_root, desc);
  return desc;
};

internals.describe = function (item, options = {}) {
  if (Array.isArray(item)) {
    return item.map(internals.describe);
  }

  if (item === Common.symbols.deepDefault) {
    return {
      special: 'deep'
    };
  }

  if (typeof item !== 'object' || item === null) {
    return item;
  }

  if (options.assign === 'options') {
    return Clone(item);
  }

  if (Buffer && Buffer.isBuffer(item)) {
    // $lab:coverage:ignore$
    return {
      buffer: item.toString('binary')
    };
  }

  if (item instanceof Date) {
    return item.toISOString();
  }

  if (item instanceof Error) {
    return item;
  }

  if (item instanceof RegExp) {
    if (options.assign === 'regex') {
      return item.toString();
    }

    return {
      regex: item.toString()
    };
  }

  if (item[Common.symbols.literal]) {
    return {
      function: item.literal
    };
  }

  if (typeof item.describe === 'function') {
    if (options.assign === 'ref') {
      return item.describe().ref;
    }

    return item.describe();
  }

  const normalized = {};

  for (const key in item) {
    const value = item[key];

    if (value === undefined) {
      continue;
    }

    normalized[key] = internals.describe(value, {
      assign: key
    });
  }

  return normalized;
};

exports.build = function (joi, desc) {
  const builder = new internals.Builder(joi);
  return builder.parse(desc);
};

internals.Builder = class {
  constructor(joi) {
    this.joi = joi;
  }

  parse(desc) {
    internals.validate(this.joi, desc); // Type

    let schema = this.joi[desc.type]();
    const def = schema._definition; // Flags

    if (desc.flags) {
      for (const flag in desc.flags) {
        const setter = def.flags[flag] && def.flags[flag].setter || flag;
        Assert(typeof schema[setter] === 'function', 'Invalid flag', flag, 'for type', desc.type);
        schema = schema[setter](this.build(desc.flags[flag]));
      }
    } // Preferences


    if (desc.preferences) {
      schema = schema.preferences(this.build(desc.preferences));
    } // Allow / Invalid


    if (desc.allow) {
      schema = schema.allow(...this.build(desc.allow));
    }

    if (desc.invalid) {
      schema = schema.invalid(...this.build(desc.invalid));
    } // Rules


    if (desc.rules) {
      for (const rule of desc.rules) {
        Assert(typeof schema[rule.name] === 'function', 'Invalid rule', rule.name, 'for type', desc.type);
        const args = [];

        if (rule.args) {
          const built = {};

          for (const key in rule.args) {
            built[key] = this.build(rule.args[key], {
              assign: key
            });
          }

          const keys = Object.keys(built);
          const definition = def.rules[rule.name].args;

          if (definition) {
            Assert(keys.length <= definition.length, 'Invalid number of arguments for', desc.type, rule.name, '(expected up to', definition.length, ', found', keys.length, ')');

            for (const {
              name
            } of definition) {
              args.push(built[name]);
            }
          } else {
            Assert(keys.length === 1, 'Invalid number of arguments for', desc.type, rule.name, '(expected up to 1, found', keys.length, ')');
            args.push(built[keys[0]]);
          }
        } // Apply


        schema = schema[rule.name](...args); // Ruleset

        const options = {};

        for (const custom in def.modifiers) {
          if (rule[custom] !== undefined) {
            options[custom] = this.build(rule[custom]);
          }
        }

        if (Object.keys(options).length) {
          schema = schema.rule(options);
        }
      }
    } // Terms


    const terms = {};

    for (const key in desc) {
      if (['allow', 'flags', 'invalid', 'whens', 'preferences', 'rules', 'type'].includes(key)) {
        continue;
      }

      Assert(def.terms[key], 'Term', key, 'missing configuration');
      const manifest = def.terms[key].manifest;

      if (manifest === 'schema') {
        terms[key] = desc[key].map(item => this.parse(item));
        continue;
      }

      if (manifest === 'values') {
        terms[key] = desc[key].map(item => this.build(item));
        continue;
      }

      if (manifest === 'single') {
        terms[key] = this.build(desc[key]);
        continue;
      }

      if (typeof manifest === 'object') {
        terms[key] = {};

        for (const name in desc[key]) {
          const value = desc[key][name];
          terms[key][name] = this.parse(value);
        }

        continue;
      }

      terms[key] = this.build(desc[key]);
    }

    if (desc.whens) {
      terms.whens = desc.whens.map(when => this.build(when));
    }

    schema = def.manifest.build(schema, terms);
    schema.$_temp.ruleset = false;
    return schema;
  }

  build(desc, options = {}) {
    if (desc === null) {
      return null;
    }

    if (Array.isArray(desc)) {
      return desc.map(item => this.build(item));
    }

    if (desc instanceof Error) {
      return desc;
    }

    if (options.assign === 'options') {
      return Clone(desc);
    }

    if (options.assign === 'regex') {
      return internals.regex(desc);
    }

    if (options.assign === 'ref') {
      return Ref.build(desc);
    }

    if (typeof desc !== 'object') {
      return desc;
    }

    if (Object.keys(desc).length === 1) {
      if (desc.buffer) {
        Assert(Buffer, 'Buffers are not supported');
        return Buffer && Buffer.from(desc.buffer, 'binary'); // $lab:coverage:ignore$
      }

      if (desc.function) {
        return {
          [Common.symbols.literal]: true,
          literal: desc.function
        };
      }

      if (desc.override) {
        return Common.symbols.override;
      }

      if (desc.ref) {
        return Ref.build(desc.ref);
      }

      if (desc.regex) {
        return internals.regex(desc.regex);
      }

      if (desc.special) {
        Assert(['deep'].includes(desc.special), 'Unknown special value', desc.special);
        return Common.symbols.deepDefault;
      }

      if (desc.value) {
        return Clone(desc.value);
      }
    }

    if (desc.type) {
      return this.parse(desc);
    }

    if (desc.template) {
      return Template.build(desc);
    }

    const normalized = {};

    for (const key in desc) {
      normalized[key] = this.build(desc[key], {
        assign: key
      });
    }

    return normalized;
  }

};

internals.regex = function (string) {
  const end = string.lastIndexOf('/');
  const exp = string.slice(1, end);
  const flags = string.slice(end + 1);
  return new RegExp(exp, flags);
};

internals.validate = function (joi, desc) {
  Schemas = Schemas || __webpack_require__(/*! ./schemas */ "./node_modules/@hapi/joi/lib/schemas.js");
  joi.assert(desc, Schemas.description);
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/messages.js":
/*!************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/messages.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Template = __webpack_require__(/*! ./template */ "./node_modules/@hapi/joi/lib/template.js");

const internals = {};

exports.compile = function (messages, target) {
  // Single value string ('plain error message', 'template {error} message')
  if (typeof messages === 'string') {
    Assert(!target, 'Cannot set single message string');
    return new Template(messages);
  } // Single value template


  if (Template.isTemplate(messages)) {
    Assert(!target, 'Cannot set single message template');
    return messages;
  } // By error code { 'number.min': <string | template> }


  Assert(typeof messages === 'object' && !Array.isArray(messages), 'Invalid message options');
  target = target ? Clone(target) : {};

  for (let code in messages) {
    const message = messages[code];

    if (code === 'root' || Template.isTemplate(message)) {
      target[code] = message;
      continue;
    }

    if (typeof message === 'string') {
      target[code] = new Template(message);
      continue;
    } // By language { english: { 'number.min': <string | template> } }


    Assert(typeof message === 'object' && !Array.isArray(message), 'Invalid message for', code);
    const language = code;
    target[language] = target[language] || {};

    for (code in message) {
      const localized = message[code];

      if (code === 'root' || Template.isTemplate(localized)) {
        target[language][code] = localized;
        continue;
      }

      Assert(typeof localized === 'string', 'Invalid message for', code, 'in', language);
      target[language][code] = new Template(localized);
    }
  }

  return target;
};

exports.decompile = function (messages) {
  // By error code { 'number.min': <string | template> }
  const target = {};

  for (let code in messages) {
    const message = messages[code];

    if (code === 'root') {
      target[code] = message;
      continue;
    }

    if (Template.isTemplate(message)) {
      target[code] = message.describe({
        compact: true
      });
      continue;
    } // By language { english: { 'number.min': <string | template> } }


    const language = code;
    target[language] = {};

    for (code in message) {
      const localized = message[code];

      if (code === 'root') {
        target[language][code] = localized;
        continue;
      }

      target[language][code] = localized.describe({
        compact: true
      });
    }
  }

  return target;
};

exports.merge = function (base, extended) {
  if (!base) {
    return exports.compile(extended);
  }

  if (!extended) {
    return base;
  } // Single value string


  if (typeof extended === 'string') {
    return new Template(extended);
  } // Single value template


  if (Template.isTemplate(extended)) {
    return extended;
  } // By error code { 'number.min': <string | template> }


  const target = Clone(base);

  for (let code in extended) {
    const message = extended[code];

    if (code === 'root' || Template.isTemplate(message)) {
      target[code] = message;
      continue;
    }

    if (typeof message === 'string') {
      target[code] = new Template(message);
      continue;
    } // By language { english: { 'number.min': <string | template> } }


    Assert(typeof message === 'object' && !Array.isArray(message), 'Invalid message for', code);
    const language = code;
    target[language] = target[language] || {};

    for (code in message) {
      const localized = message[code];

      if (code === 'root' || Template.isTemplate(localized)) {
        target[language][code] = localized;
        continue;
      }

      Assert(typeof localized === 'string', 'Invalid message for', code, 'in', language);
      target[language][code] = new Template(localized);
    }
  }

  return target;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/modify.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/modify.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const internals = {};
exports.Ids = internals.Ids = class {
  constructor() {
    this._byId = new Map();
    this._byKey = new Map();
    this._schemaChain = false;
  }

  clone() {
    const clone = new internals.Ids();
    clone._byId = new Map(this._byId);
    clone._byKey = new Map(this._byKey);
    clone._schemaChain = this._schemaChain;
    return clone;
  }

  concat(source) {
    if (source._schemaChain) {
      this._schemaChain = true;
    }

    for (const [id, value] of source._byId.entries()) {
      Assert(!this._byKey.has(id), 'Schema id conflicts with existing key:', id);

      this._byId.set(id, value);
    }

    for (const [key, value] of source._byKey.entries()) {
      Assert(!this._byId.has(key), 'Schema key conflicts with existing id:', key);

      this._byKey.set(key, value);
    }
  }

  fork(path, adjuster, root) {
    const chain = this._collect(path);

    chain.push({
      schema: root
    });
    const tail = chain.shift();
    let adjusted = {
      id: tail.id,
      schema: adjuster(tail.schema)
    };
    Assert(Common.isSchema(adjusted.schema), 'adjuster function failed to return a joi schema type');

    for (const node of chain) {
      adjusted = {
        id: node.id,
        schema: internals.fork(node.schema, adjusted.id, adjusted.schema)
      };
    }

    return adjusted.schema;
  }

  labels(path, behind = []) {
    const current = path[0];

    const node = this._get(current);

    if (!node) {
      return [...behind, ...path].join('.');
    }

    const forward = path.slice(1);
    behind = [...behind, node.schema._flags.label || current];

    if (!forward.length) {
      return behind.join('.');
    }

    return node.schema._ids.labels(forward, behind);
  }

  reach(path, behind = []) {
    const current = path[0];

    const node = this._get(current);

    Assert(node, 'Schema does not contain path', [...behind, ...path].join('.'));
    const forward = path.slice(1);

    if (!forward.length) {
      return node.schema;
    }

    return node.schema._ids.reach(forward, [...behind, current]);
  }

  register(schema, {
    key
  } = {}) {
    if (!schema || !Common.isSchema(schema)) {
      return;
    }

    if (schema.$_property('schemaChain') || schema._ids._schemaChain) {
      this._schemaChain = true;
    }

    const id = schema._flags.id;

    if (id) {
      const existing = this._byId.get(id);

      Assert(!existing || existing.schema === schema, 'Cannot add different schemas with the same id:', id);
      Assert(!this._byKey.has(id), 'Schema id conflicts with existing key:', id);

      this._byId.set(id, {
        schema,
        id
      });
    }

    if (key) {
      Assert(!this._byKey.has(key), 'Schema already contains key:', key);
      Assert(!this._byId.has(key), 'Schema key conflicts with existing id:', key);

      this._byKey.set(key, {
        schema,
        id: key
      });
    }
  }

  reset() {
    this._byId = new Map();
    this._byKey = new Map();
    this._schemaChain = false;
  }

  _collect(path, behind = [], nodes = []) {
    const current = path[0];

    const node = this._get(current);

    Assert(node, 'Schema does not contain path', [...behind, ...path].join('.'));
    nodes = [node, ...nodes];
    const forward = path.slice(1);

    if (!forward.length) {
      return nodes;
    }

    return node.schema._ids._collect(forward, [...behind, current], nodes);
  }

  _get(id) {
    return this._byId.get(id) || this._byKey.get(id);
  }

};

internals.fork = function (schema, id, replacement) {
  const each = (item, {
    key
  }) => {
    if (id === (item._flags.id || key)) {
      return replacement;
    }
  };

  const obj = exports.schema(schema, {
    each,
    ref: false
  });
  return obj ? obj.$_mutateRebuild() : schema;
};

exports.schema = function (schema, options) {
  let obj;

  for (const name in schema._flags) {
    if (name[0] === '_') {
      continue;
    }

    const result = internals.scan(schema._flags[name], {
      source: 'flags',
      name
    }, options);

    if (result !== undefined) {
      obj = obj || schema.clone();
      obj._flags[name] = result;
    }
  }

  for (let i = 0; i < schema._rules.length; ++i) {
    const rule = schema._rules[i];
    const result = internals.scan(rule.args, {
      source: 'rules',
      name: rule.name
    }, options);

    if (result !== undefined) {
      obj = obj || schema.clone();
      const clone = Object.assign({}, rule);
      clone.args = result;
      obj._rules[i] = clone;

      const existingUnique = obj._singleRules.get(rule.name);

      if (existingUnique === rule) {
        obj._singleRules.set(rule.name, clone);
      }
    }
  }

  for (const name in schema.$_terms) {
    if (name[0] === '_') {
      continue;
    }

    const result = internals.scan(schema.$_terms[name], {
      source: 'terms',
      name
    }, options);

    if (result !== undefined) {
      obj = obj || schema.clone();
      obj.$_terms[name] = result;
    }
  }

  return obj;
};

internals.scan = function (item, source, options, _path, _key) {
  const path = _path || [];

  if (item === null || typeof item !== 'object') {
    return;
  }

  let clone;

  if (Array.isArray(item)) {
    for (let i = 0; i < item.length; ++i) {
      const key = source.source === 'terms' && source.name === 'keys' && item[i].key;
      const result = internals.scan(item[i], source, options, [i, ...path], key);

      if (result !== undefined) {
        clone = clone || item.slice();
        clone[i] = result;
      }
    }

    return clone;
  }

  if (options.schema !== false && Common.isSchema(item) || options.ref !== false && Ref.isRef(item)) {
    const result = options.each(item, { ...source,
      path,
      key: _key
    });

    if (result === item) {
      return;
    }

    return result;
  }

  for (const key in item) {
    if (key[0] === '_') {
      continue;
    }

    const result = internals.scan(item[key], source, options, [key, ...path], _key);

    if (result !== undefined) {
      clone = clone || Object.assign({}, item);
      clone[key] = result;
    }
  }

  return clone;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/ref.js":
/*!*******************************************!*\
  !*** ./node_modules/@hapi/joi/lib/ref.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Reach = __webpack_require__(/*! @hapi/hoek/lib/reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

let Template;
const internals = {
  symbol: Symbol('ref'),
  // Used to internally identify references (shared with other joi versions)
  defaults: {
    adjust: null,
    in: false,
    iterables: null,
    map: null,
    separator: '.',
    type: 'value'
  }
};

exports.create = function (key, options = {}) {
  Assert(typeof key === 'string', 'Invalid reference key:', key);
  Common.assertOptions(options, ['adjust', 'ancestor', 'in', 'iterables', 'map', 'prefix', 'separator']);
  Assert(!options.prefix || typeof options.prefix === 'object', 'options.prefix must be of type object');
  const ref = Object.assign({}, internals.defaults, options);
  delete ref.prefix;
  const separator = ref.separator;
  const context = internals.context(key, separator, options.prefix);
  ref.type = context.type;
  key = context.key;

  if (ref.type === 'value') {
    if (context.root) {
      Assert(!separator || key[0] !== separator, 'Cannot specify relative path with root prefix');
      ref.ancestor = 'root';

      if (!key) {
        key = null;
      }
    }

    if (separator && separator === key) {
      key = null;
      ref.ancestor = 0;
    } else {
      if (ref.ancestor !== undefined) {
        Assert(!separator || !key || key[0] !== separator, 'Cannot combine prefix with ancestor option');
      } else {
        const [ancestor, slice] = internals.ancestor(key, separator);

        if (slice) {
          key = key.slice(slice);

          if (key === '') {
            key = null;
          }
        }

        ref.ancestor = ancestor;
      }
    }
  }

  ref.path = separator ? key === null ? [] : key.split(separator) : [key];
  return new internals.Ref(ref);
};

exports.in = function (key, options = {}) {
  return exports.create(key, Object.assign({}, options, {
    in: true
  }));
};

exports.isRef = function (ref) {
  return ref ? !!ref[Common.symbols.ref] : false;
};

internals.Ref = class {
  constructor(options) {
    Assert(typeof options === 'object', 'Invalid reference construction');
    Common.assertOptions(options, ['adjust', 'ancestor', 'in', 'iterables', 'map', 'path', 'separator', 'type', // Copied
    'depth', 'key', 'root', 'display' // Overridden
    ]);
    Assert([false, undefined].includes(options.separator) || typeof options.separator === 'string' && options.separator.length === 1, 'Invalid separator');
    Assert(!options.adjust || typeof options.adjust === 'function', 'options.adjust must be a function');
    Assert(!options.map || Array.isArray(options.map), 'options.map must be an array');
    Assert(!options.map || !options.adjust, 'Cannot set both map and adjust options');
    Object.assign(this, internals.defaults, options);
    Assert(this.type === 'value' || this.ancestor === undefined, 'Non-value references cannot reference ancestors');

    if (Array.isArray(this.map)) {
      this.map = new Map(this.map);
    }

    this.depth = this.path.length;
    this.key = this.path.length ? this.path.join(this.separator) : null;
    this.root = this.path[0];
    this.updateDisplay();
  }

  resolve(value, state, prefs, local, options = {}) {
    Assert(!this.in || options.in, 'Invalid in() reference usage');

    if (this.type === 'global') {
      return this._resolve(prefs.context, state, options);
    }

    if (this.type === 'local') {
      return this._resolve(local, state, options);
    }

    if (!this.ancestor) {
      return this._resolve(value, state, options);
    }

    if (this.ancestor === 'root') {
      return this._resolve(state.ancestors[state.ancestors.length - 1], state, options);
    }

    Assert(this.ancestor <= state.ancestors.length, 'Invalid reference exceeds the schema root:', this.display);
    return this._resolve(state.ancestors[this.ancestor - 1], state, options);
  }

  _resolve(target, state, options) {
    let resolved;

    if (this.type === 'value' && state.mainstay.shadow && options.shadow !== false) {
      resolved = state.mainstay.shadow.get(this.absolute(state));
    }

    if (resolved === undefined) {
      resolved = Reach(target, this.path, {
        iterables: this.iterables,
        functions: true
      });
    }

    if (this.adjust) {
      resolved = this.adjust(resolved);
    }

    if (this.map) {
      const mapped = this.map.get(resolved);

      if (mapped !== undefined) {
        resolved = mapped;
      }
    }

    if (state.mainstay) {
      state.mainstay.tracer.resolve(state, this, resolved);
    }

    return resolved;
  }

  toString() {
    return this.display;
  }

  absolute(state) {
    return [...state.path.slice(0, -this.ancestor), ...this.path];
  }

  clone() {
    return new internals.Ref(this);
  }

  describe() {
    const ref = {
      path: this.path
    };

    if (this.type !== 'value') {
      ref.type = this.type;
    }

    if (this.separator !== '.') {
      ref.separator = this.separator;
    }

    if (this.type === 'value' && this.ancestor !== 1) {
      ref.ancestor = this.ancestor;
    }

    if (this.map) {
      ref.map = [...this.map];
    }

    for (const key of ['adjust', 'iterables']) {
      if (this[key] !== null) {
        ref[key] = this[key];
      }
    }

    if (this.in !== false) {
      ref.in = true;
    }

    return {
      ref
    };
  }

  updateDisplay() {
    const key = this.key !== null ? this.key : '';

    if (this.type !== 'value') {
      this.display = `ref:${this.type}:${key}`;
      return;
    }

    if (!this.separator) {
      this.display = `ref:${key}`;
      return;
    }

    if (!this.ancestor) {
      this.display = `ref:${this.separator}${key}`;
      return;
    }

    if (this.ancestor === 'root') {
      this.display = `ref:root:${key}`;
      return;
    }

    if (this.ancestor === 1) {
      this.display = `ref:${key || '..'}`;
      return;
    }

    const lead = new Array(this.ancestor + 1).fill(this.separator).join('');
    this.display = `ref:${lead}${key || ''}`;
  }

};
internals.Ref.prototype[Common.symbols.ref] = true;

exports.build = function (desc) {
  desc = Object.assign({}, internals.defaults, desc);

  if (desc.type === 'value' && desc.ancestor === undefined) {
    desc.ancestor = 1;
  }

  return new internals.Ref(desc);
};

internals.context = function (key, separator, prefix = {}) {
  key = key.trim();

  if (prefix) {
    const globalp = prefix.global === undefined ? '$' : prefix.global;

    if (globalp !== separator && key.startsWith(globalp)) {
      return {
        key: key.slice(globalp.length),
        type: 'global'
      };
    }

    const local = prefix.local === undefined ? '#' : prefix.local;

    if (local !== separator && key.startsWith(local)) {
      return {
        key: key.slice(local.length),
        type: 'local'
      };
    }

    const root = prefix.root === undefined ? '/' : prefix.root;

    if (root !== separator && key.startsWith(root)) {
      return {
        key: key.slice(root.length),
        type: 'value',
        root: true
      };
    }
  }

  return {
    key,
    type: 'value'
  };
};

internals.ancestor = function (key, separator) {
  if (!separator) {
    return [1, 0]; // 'a_b' -> 1 (parent)
  }

  if (key[0] !== separator) {
    // 'a.b' -> 1 (parent)
    return [1, 0];
  }

  if (key[1] !== separator) {
    // '.a.b' -> 0 (self)
    return [0, 1];
  }

  let i = 2;

  while (key[i] === separator) {
    ++i;
  }

  return [i - 1, i]; // '...a.b.' -> 2 (grandparent)
};

exports.toSibling = 0;
exports.toParent = 1;
exports.Manager = class {
  constructor() {
    this.refs = []; // 0: [self refs], 1: [parent refs], 2: [grandparent refs], ...
  }

  register(source, target) {
    if (!source) {
      return;
    }

    target = target === undefined ? exports.toParent : target; // Array

    if (Array.isArray(source)) {
      for (const ref of source) {
        this.register(ref, target);
      }

      return;
    } // Schema


    if (Common.isSchema(source)) {
      for (const item of source._refs.refs) {
        if (item.ancestor - target >= 0) {
          this.refs.push({
            ancestor: item.ancestor - target,
            root: item.root
          });
        }
      }

      return;
    } // Reference


    if (exports.isRef(source) && source.type === 'value' && source.ancestor - target >= 0) {
      this.refs.push({
        ancestor: source.ancestor - target,
        root: source.root
      });
    } // Template


    Template = Template || __webpack_require__(/*! ./template */ "./node_modules/@hapi/joi/lib/template.js");

    if (Template.isTemplate(source)) {
      this.register(source.refs(), target);
    }
  }

  get length() {
    return this.refs.length;
  }

  clone() {
    const copy = new exports.Manager();
    copy.refs = Clone(this.refs);
    return copy;
  }

  reset() {
    this.refs = [];
  }

  roots() {
    return this.refs.filter(ref => !ref.ancestor).map(ref => ref.root);
  }

};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/schemas.js":
/*!***********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/schemas.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Joi = __webpack_require__(/*! ./index */ "./node_modules/@hapi/joi/lib/index.js");

const internals = {}; // Preferences

internals.wrap = Joi.string().min(1).max(2).allow(false);
exports.preferences = Joi.object({
  allowUnknown: Joi.boolean(),
  abortEarly: Joi.boolean(),
  cache: Joi.boolean(),
  context: Joi.object(),
  convert: Joi.boolean(),
  dateFormat: Joi.valid('date', 'iso', 'string', 'time', 'utc'),
  debug: Joi.boolean(),
  errors: {
    escapeHtml: Joi.boolean(),
    label: Joi.valid('path', 'key', false),
    language: [Joi.string(), Joi.object().ref()],
    render: Joi.boolean(),
    stack: Joi.boolean(),
    wrap: {
      label: internals.wrap,
      array: internals.wrap
    }
  },
  externals: Joi.boolean(),
  messages: Joi.object(),
  noDefaults: Joi.boolean(),
  nonEnumerables: Joi.boolean(),
  presence: Joi.valid('required', 'optional', 'forbidden'),
  skipFunctions: Joi.boolean(),
  stripUnknown: Joi.object({
    arrays: Joi.boolean(),
    objects: Joi.boolean()
  }).or('arrays', 'objects').allow(true, false),
  warnings: Joi.boolean()
}).strict(); // Extensions

internals.nameRx = /^[a-zA-Z0-9]\w*$/;
internals.rule = Joi.object({
  alias: Joi.array().items(Joi.string().pattern(internals.nameRx)).single(),
  args: Joi.array().items(Joi.string(), Joi.object({
    name: Joi.string().pattern(internals.nameRx).required(),
    ref: Joi.boolean(),
    assert: Joi.alternatives([Joi.function(), Joi.object().schema()]).conditional('ref', {
      is: true,
      then: Joi.required()
    }),
    normalize: Joi.function(),
    message: Joi.string().when('assert', {
      is: Joi.function(),
      then: Joi.required()
    })
  })),
  convert: Joi.boolean(),
  manifest: Joi.boolean(),
  method: Joi.function().allow(false),
  multi: Joi.boolean(),
  validate: Joi.function()
});
exports.extension = Joi.object({
  type: Joi.alternatives([Joi.string(), Joi.object().regex()]).required(),
  args: Joi.function(),
  base: Joi.object().schema().when('type', {
    is: Joi.object().regex(),
    then: Joi.forbidden()
  }),
  coerce: [Joi.function().maxArity(3), Joi.object({
    method: Joi.function().maxArity(3).required(),
    from: Joi.array().items(Joi.string()).single()
  })],
  flags: Joi.object().pattern(internals.nameRx, Joi.object({
    setter: Joi.string(),
    default: Joi.any()
  })),
  manifest: {
    build: Joi.function().arity(2)
  },
  messages: [Joi.object(), Joi.string()],
  modifiers: Joi.object().pattern(internals.nameRx, Joi.function().minArity(1).maxArity(2)),
  overrides: Joi.object().pattern(internals.nameRx, Joi.function()),
  prepare: Joi.function().maxArity(3),
  rebuild: Joi.function().arity(1),
  rules: Joi.object().pattern(internals.nameRx, internals.rule),
  terms: Joi.object().pattern(internals.nameRx, Joi.object({
    init: Joi.array().allow(null).required(),
    manifest: Joi.object().pattern(/.+/, [Joi.valid('schema', 'single'), Joi.object({
      mapped: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required()
      }).required()
    })])
  })),
  validate: Joi.function().maxArity(3)
}).strict();
exports.extensions = Joi.array().items(Joi.object(), Joi.function().arity(1)).strict(); // Manifest

internals.desc = {
  buffer: Joi.object({
    buffer: Joi.string()
  }),
  func: Joi.object({
    function: Joi.function().required(),
    options: {
      literal: true
    }
  }),
  override: Joi.object({
    override: true
  }),
  ref: Joi.object({
    ref: Joi.object({
      type: Joi.valid('value', 'global', 'local'),
      path: Joi.array().required(),
      separator: Joi.string().length(1).allow(false),
      ancestor: Joi.number().min(0).integer().allow('root'),
      map: Joi.array().items(Joi.array().length(2)).min(1),
      adjust: Joi.function(),
      iterables: Joi.boolean(),
      in: Joi.boolean()
    }).required()
  }),
  regex: Joi.object({
    regex: Joi.string().min(3)
  }),
  special: Joi.object({
    special: Joi.valid('deep').required()
  }),
  template: Joi.object({
    template: Joi.string().required(),
    options: Joi.object()
  }),
  value: Joi.object({
    value: Joi.alternatives([Joi.object(), Joi.array()]).required()
  })
};
internals.desc.entity = Joi.alternatives([Joi.array().items(Joi.link('...')), Joi.boolean(), Joi.function(), Joi.number(), Joi.string(), internals.desc.buffer, internals.desc.func, internals.desc.ref, internals.desc.regex, internals.desc.special, internals.desc.template, internals.desc.value, Joi.link('/')]);
internals.desc.values = Joi.array().items(null, Joi.boolean(), Joi.function(), Joi.number().allow(Infinity, -Infinity), Joi.string().allow(''), Joi.symbol(), internals.desc.buffer, internals.desc.func, internals.desc.override, internals.desc.ref, internals.desc.regex, internals.desc.template, internals.desc.value);
internals.desc.messages = Joi.object().pattern(/.+/, [Joi.string(), internals.desc.template, Joi.object().pattern(/.+/, [Joi.string(), internals.desc.template])]);
exports.description = Joi.object({
  type: Joi.string().required(),
  flags: Joi.object({
    cast: Joi.string(),
    default: Joi.any(),
    description: Joi.string(),
    empty: Joi.link('/'),
    failover: internals.desc.entity,
    id: Joi.string(),
    label: Joi.string(),
    only: true,
    presence: ['optional', 'required', 'forbidden'],
    result: ['raw', 'strip'],
    strip: Joi.boolean(),
    unit: Joi.string()
  }).unknown(),
  preferences: {
    allowUnknown: Joi.boolean(),
    abortEarly: Joi.boolean(),
    cache: Joi.boolean(),
    convert: Joi.boolean(),
    dateFormat: ['date', 'iso', 'string', 'time', 'utc'],
    errors: {
      escapeHtml: Joi.boolean(),
      label: ['path', 'key'],
      language: [Joi.string(), internals.desc.ref],
      wrap: {
        label: internals.wrap,
        array: internals.wrap
      }
    },
    externals: Joi.boolean(),
    messages: internals.desc.messages,
    noDefaults: Joi.boolean(),
    nonEnumerables: Joi.boolean(),
    presence: ['required', 'optional', 'forbidden'],
    skipFunctions: Joi.boolean(),
    stripUnknown: Joi.object({
      arrays: Joi.boolean(),
      objects: Joi.boolean()
    }).or('arrays', 'objects').allow(true, false),
    warnings: Joi.boolean()
  },
  allow: internals.desc.values,
  invalid: internals.desc.values,
  rules: Joi.array().min(1).items({
    name: Joi.string().required(),
    args: Joi.object().min(1),
    keep: Joi.boolean(),
    message: [Joi.string(), internals.desc.messages],
    warn: Joi.boolean()
  }),
  // Terms
  keys: Joi.object().pattern(/.*/, Joi.link('/')),
  link: internals.desc.ref
}).pattern(/^[a-z]\w*$/, Joi.any());

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/state.js":
/*!*********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/state.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Reach = __webpack_require__(/*! @hapi/hoek/lib/reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {
  value: Symbol('value')
};
module.exports = internals.State = class {
  constructor(path, ancestors, state) {
    this.path = path;
    this.ancestors = ancestors; // [parent, ..., root]

    this.mainstay = state.mainstay;
    this.schemas = state.schemas; // [current, ..., root]

    this.debug = null;
  }

  localize(path, ancestors = null, schema = null) {
    const state = new internals.State(path, ancestors, this);

    if (schema && state.schemas) {
      state.schemas = [internals.schemas(schema), ...state.schemas];
    }

    return state;
  }

  nest(schema, debug) {
    const state = new internals.State(this.path, this.ancestors, this);
    state.schemas = state.schemas && [internals.schemas(schema), ...state.schemas];
    state.debug = debug;
    return state;
  }

  shadow(value, reason) {
    this.mainstay.shadow = this.mainstay.shadow || new internals.Shadow();
    this.mainstay.shadow.set(this.path, value, reason);
  }

  snapshot() {
    if (this.mainstay.shadow) {
      this._snapshot = Clone(this.mainstay.shadow.node(this.path));
    }
  }

  restore() {
    if (this.mainstay.shadow) {
      this.mainstay.shadow.override(this.path, this._snapshot);
      this._snapshot = undefined;
    }
  }

};

internals.schemas = function (schema) {
  if (Common.isSchema(schema)) {
    return {
      schema
    };
  }

  return schema;
};

internals.Shadow = class {
  constructor() {
    this._values = null;
  }

  set(path, value, reason) {
    if (!path.length) {
      // No need to store root value
      return;
    }

    if (reason === 'strip' && typeof path[path.length - 1] === 'number') {
      // Cannot store stripped array values (due to shift)
      return;
    }

    this._values = this._values || new Map();
    let node = this._values;

    for (let i = 0; i < path.length; ++i) {
      const segment = path[i];
      let next = node.get(segment);

      if (!next) {
        next = new Map();
        node.set(segment, next);
      }

      node = next;
    }

    node[internals.value] = value;
  }

  get(path) {
    const node = this.node(path);

    if (node) {
      return node[internals.value];
    }
  }

  node(path) {
    if (!this._values) {
      return;
    }

    return Reach(this._values, path, {
      iterables: true
    });
  }

  override(path, node) {
    if (!this._values) {
      return;
    }

    const parents = path.slice(0, -1);
    const own = path[path.length - 1];
    const parent = Reach(this._values, parents, {
      iterables: true
    });

    if (node) {
      parent.set(own, node);
      return;
    }

    if (parent) {
      parent.delete(own);
    }
  }

};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/template.js":
/*!************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/template.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const EscapeHtml = __webpack_require__(/*! @hapi/hoek/lib/escapeHtml */ "./node_modules/@hapi/hoek/lib/escapeHtml.js");

const Formula = __webpack_require__(/*! @hapi/formula */ "./node_modules/@hapi/formula/lib/index.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/joi/lib/errors.js");

const Ref = __webpack_require__(/*! ./ref */ "./node_modules/@hapi/joi/lib/ref.js");

const internals = {
  symbol: Symbol('template'),
  opens: new Array(1000).join('\u0000'),
  closes: new Array(1000).join('\u0001'),
  dateFormat: {
    date: Date.prototype.toDateString,
    iso: Date.prototype.toISOString,
    string: Date.prototype.toString,
    time: Date.prototype.toTimeString,
    utc: Date.prototype.toUTCString
  }
};
module.exports = exports = internals.Template = class {
  constructor(source, options) {
    Assert(typeof source === 'string', 'Template source must be a string');
    Assert(!source.includes('\u0000') && !source.includes('\u0001'), 'Template source cannot contain reserved control characters');
    this.source = source;
    this.rendered = source;
    this._template = null;
    this._settings = Clone(options);

    this._parse();
  }

  _parse() {
    // 'text {raw} {{ref}} \\{{ignore}} {{ignore\\}} {{ignore {{ignore}'
    if (!this.source.includes('{')) {
      return;
    } // Encode escaped \\{{{{{


    const encoded = internals.encode(this.source); // Split on first { in each set

    const parts = internals.split(encoded); // Process parts

    let refs = false;
    const processed = [];
    const head = parts.shift();

    if (head) {
      processed.push(head);
    }

    for (const part of parts) {
      const raw = part[0] !== '{';
      const ender = raw ? '}' : '}}';
      const end = part.indexOf(ender);

      if (end === -1 || // Ignore non-matching closing
      part[1] === '{') {
        // Ignore more than two {
        processed.push(`{${internals.decode(part)}`);
        continue;
      }

      const variable = part.slice(raw ? 0 : 1, end);

      const dynamic = this._ref(internals.decode(variable), raw);

      processed.push(dynamic);

      if (typeof dynamic !== 'string') {
        refs = true;
      }

      const rest = part.slice(end + ender.length);

      if (rest) {
        processed.push(internals.decode(rest));
      }
    }

    if (!refs) {
      this.rendered = processed.join('');
      return;
    }

    this._template = processed;
  }

  static date(date, prefs) {
    return internals.dateFormat[prefs.dateFormat].call(date);
  }

  describe(options = {}) {
    if (!this._settings && options.compact) {
      return this.source;
    }

    const desc = {
      template: this.source
    };

    if (this._settings) {
      desc.options = this._settings;
    }

    return desc;
  }

  static build(desc) {
    return new internals.Template(desc.template, desc.options);
  }

  isDynamic() {
    return !!this._template;
  }

  static isTemplate(template) {
    return template ? !!template[Common.symbols.template] : false;
  }

  refs() {
    if (!this._template) {
      return;
    }

    const refs = [];

    for (const part of this._template) {
      if (typeof part !== 'string') {
        refs.push(...part.refs);
      }
    }

    return refs;
  }

  resolve(value, state, prefs, local) {
    if (this._template && this._template.length === 1) {
      return this._part(this._template[0],
      /* context -> [*/
      value, state, prefs, local, {}
      /*] */
      );
    }

    return this.render(value, state, prefs, local);
  }

  _part(part, ...args) {
    if (part.ref) {
      return part.ref.resolve(...args);
    }

    return part.formula.evaluate(args);
  }

  render(value, state, prefs, local, options = {}) {
    if (!this.isDynamic()) {
      return this.rendered;
    }

    const parts = [];

    for (const part of this._template) {
      if (typeof part === 'string') {
        parts.push(part);
      } else {
        const rendered = this._part(part,
        /* context -> [*/
        value, state, prefs, local, options
        /*] */
        );

        const string = internals.stringify(rendered, prefs, options.errors);

        if (string !== undefined) {
          const result = part.raw || (options.errors && options.errors.escapeHtml) === false ? string : EscapeHtml(string);
          const ends = part.ref && part.ref.type === 'local' && part.ref.key === 'label' && prefs.errors.wrap.label;
          parts.push(internals.wrap(result, ends));
        }
      }
    }

    return parts.join('');
  }

  _ref(content, raw) {
    const refs = [];

    const reference = variable => {
      const ref = Ref.create(variable, this._settings);
      refs.push(ref);
      return context => ref.resolve(...context);
    };

    try {
      var formula = new Formula.Parser(content, {
        reference,
        functions: internals.functions,
        constants: internals.constants
      });
    } catch (err) {
      err.message = `Invalid template variable "${content}" fails due to: ${err.message}`;
      throw err;
    }

    if (formula.single) {
      if (formula.single.type === 'reference') {
        return {
          ref: refs[0],
          raw,
          refs
        };
      }

      return internals.stringify(formula.single.value);
    }

    return {
      formula,
      raw,
      refs
    };
  }

  toString() {
    return this.source;
  }

};
internals.Template.prototype[Common.symbols.template] = true;
internals.Template.prototype.isImmutable = true; // Prevents Hoek from deep cloning schema objects

internals.encode = function (string) {
  return string.replace(/\\(\{+)/g, ($0, $1) => {
    return internals.opens.slice(0, $1.length);
  }).replace(/\\(\}+)/g, ($0, $1) => {
    return internals.closes.slice(0, $1.length);
  });
};

internals.decode = function (string) {
  return string.replace(/\u0000/g, '{').replace(/\u0001/g, '}');
};

internals.split = function (string) {
  const parts = [];
  let current = '';

  for (let i = 0; i < string.length; ++i) {
    const char = string[i];

    if (char === '{') {
      let next = '';

      while (i + 1 < string.length && string[i + 1] === '{') {
        next += '{';
        ++i;
      }

      parts.push(current);
      current = next;
    } else {
      current += char;
    }
  }

  parts.push(current);
  return parts;
};

internals.wrap = function (value, ends) {
  if (!ends) {
    return value;
  }

  if (ends.length === 1) {
    return `${ends}${value}${ends}`;
  }

  return `${ends[0]}${value}${ends[1]}`;
};

internals.stringify = function (value, prefs, options) {
  const type = typeof value;

  if (value === null) {
    return 'null';
  }

  if (type === 'string') {
    return value;
  }

  if (type === 'number' || type === 'function' || type === 'symbol') {
    return value.toString();
  }

  if (type !== 'object') {
    return JSON.stringify(value);
  }

  if (value instanceof Date) {
    return internals.Template.date(value, prefs);
  }

  if (value instanceof Map) {
    const pairs = [];

    for (const [key, sym] of value.entries()) {
      pairs.push(`${key.toString()} -> ${sym.toString()}`);
    }

    value = pairs;
  }

  if (!Array.isArray(value)) {
    return value.toString();
  }

  let partial = '';

  for (const item of value) {
    partial = partial + (partial.length ? ', ' : '') + internals.stringify(item, prefs, options);
  }

  return internals.wrap(partial, prefs.errors.wrap.array);
};

internals.constants = {
  true: true,
  false: false,
  null: null,
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000
};
internals.functions = {
  if(condition, then, otherwise) {
    return condition ? then : otherwise;
  },

  msg(code) {
    const [value, state, prefs, local, options] = this;
    const messages = options.messages;

    if (!messages) {
      return '';
    }

    const template = Errors.template(value, messages[0], code, state, prefs) || Errors.template(value, messages[1], code, state, prefs);

    if (!template) {
      return '';
    }

    return template.render(value, state, prefs, local, options);
  },

  number(value) {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      return parseFloat(value);
    }

    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    return null;
  }

};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/trace.js":
/*!*********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/trace.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DeepEqual = __webpack_require__(/*! @hapi/hoek/lib/deepEqual */ "./node_modules/@hapi/hoek/lib/deepEqual.js");

const Pinpoint = __webpack_require__(/*! @hapi/pinpoint */ "./node_modules/@hapi/pinpoint/lib/index.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/joi/lib/errors.js");

const internals = {
  codes: {
    error: 1,
    pass: 2,
    full: 3
  },
  labels: {
    0: 'never used',
    1: 'always error',
    2: 'always pass'
  }
};

exports.setup = function (root) {
  const trace = function () {
    root._tracer = root._tracer || new internals.Tracer();
    return root._tracer;
  };

  root.trace = trace;
  root[Symbol.for('@hapi/lab/coverage/initialize')] = trace;

  root.untrace = () => {
    root._tracer = null;
  };
};

exports.location = function (schema) {
  return schema.$_setFlag('_tracerLocation', Pinpoint.location(2)); // base.tracer(), caller
};

internals.Tracer = class {
  constructor() {
    this.name = 'Joi';
    this._schemas = new Map();
  }

  _register(schema) {
    const existing = this._schemas.get(schema);

    if (existing) {
      return existing.store;
    }

    const store = new internals.Store(schema);
    const {
      filename,
      line
    } = schema._flags._tracerLocation || Pinpoint.location(5); // internals.tracer(), internals.entry(), exports.entry(), validate(), caller

    this._schemas.set(schema, {
      filename,
      line,
      store
    });

    return store;
  }

  _combine(merged, sources) {
    for (const {
      store
    } of this._schemas.values()) {
      store._combine(merged, sources);
    }
  }

  report(file) {
    const coverage = []; // Process each registered schema

    for (const {
      filename,
      line,
      store
    } of this._schemas.values()) {
      if (file && file !== filename) {
        continue;
      } // Process sub schemas of the registered root


      const missing = [];
      const skipped = [];

      for (const [schema, log] of store._sources.entries()) {
        // Check if sub schema parent skipped
        if (internals.sub(log.paths, skipped)) {
          continue;
        } // Check if sub schema reached


        if (!log.entry) {
          missing.push({
            status: 'never reached',
            paths: [...log.paths]
          });
          skipped.push(...log.paths);
          continue;
        } // Check values


        for (const type of ['valid', 'invalid']) {
          const set = schema[`_${type}s`];

          if (!set) {
            continue;
          }

          const values = new Set(set._values);
          const refs = new Set(set._refs);

          for (const {
            value,
            ref
          } of log[type]) {
            values.delete(value);
            refs.delete(ref);
          }

          if (values.size || refs.size) {
            missing.push({
              status: [...values, ...[...refs].map(ref => ref.display)],
              rule: `${type}s`
            });
          }
        } // Check rules status


        const rules = schema._rules.map(rule => rule.name);

        for (const type of ['default', 'failover']) {
          if (schema._flags[type] !== undefined) {
            rules.push(type);
          }
        }

        for (const name of rules) {
          const status = internals.labels[log.rule[name] || 0];

          if (status) {
            const report = {
              rule: name,
              status
            };

            if (log.paths.size) {
              report.paths = [...log.paths];
            }

            missing.push(report);
          }
        }
      }

      if (missing.length) {
        coverage.push({
          filename,
          line,
          missing,
          severity: 'error',
          message: `Schema missing tests for ${missing.map(internals.message).join(', ')}`
        });
      }
    }

    return coverage.length ? coverage : null;
  }

};
internals.Store = class {
  constructor(schema) {
    this.active = true;
    this._sources = new Map(); // schema -> { paths, entry, rule, valid, invalid }

    this._combos = new Map(); // merged -> [sources]

    this._scan(schema);
  }

  debug(state, source, name, result) {
    state.mainstay.debug && state.mainstay.debug.push({
      type: source,
      name,
      result,
      path: state.path
    });
  }

  entry(schema, state) {
    internals.debug(state, {
      type: 'entry'
    });

    this._record(schema, log => {
      log.entry = true;
    });
  }

  filter(schema, state, source, value) {
    internals.debug(state, {
      type: source,
      ...value
    });

    this._record(schema, log => {
      log[source].add(value);
    });
  }

  log(schema, state, source, name, result) {
    internals.debug(state, {
      type: source,
      name,
      result: result === 'full' ? 'pass' : result
    });

    this._record(schema, log => {
      log[source][name] = log[source][name] || 0;
      log[source][name] |= internals.codes[result];
    });
  }

  resolve(state, ref, to) {
    if (!state.mainstay.debug) {
      return;
    }

    const log = {
      type: 'resolve',
      ref: ref.display,
      to,
      path: state.path
    };
    state.mainstay.debug.push(log);
  }

  value(state, by, from, to, name) {
    if (!state.mainstay.debug || DeepEqual(from, to)) {
      return;
    }

    const log = {
      type: 'value',
      by,
      from,
      to,
      path: state.path
    };

    if (name) {
      log.name = name;
    }

    state.mainstay.debug.push(log);
  }

  _record(schema, each) {
    const log = this._sources.get(schema);

    if (log) {
      each(log);
      return;
    }

    const sources = this._combos.get(schema);

    for (const source of sources) {
      this._record(source, each);
    }
  }

  _scan(schema, _path) {
    const path = _path || [];

    let log = this._sources.get(schema);

    if (!log) {
      log = {
        paths: new Set(),
        entry: false,
        rule: {},
        valid: new Set(),
        invalid: new Set()
      };

      this._sources.set(schema, log);
    }

    if (path.length) {
      log.paths.add(path);
    }

    const each = (sub, source) => {
      const subId = internals.id(sub, source);

      this._scan(sub, path.concat(subId));
    };

    schema.$_modify({
      each,
      ref: false
    });
  }

  _combine(merged, sources) {
    this._combos.set(merged, sources);
  }

};

internals.message = function (item) {
  const path = item.paths ? Errors.path(item.paths[0]) + (item.rule ? ':' : '') : '';
  return `${path}${item.rule || ''} (${item.status})`;
};

internals.id = function (schema, {
  source,
  name,
  path,
  key
}) {
  if (schema._flags.id) {
    return schema._flags.id;
  }

  if (key) {
    return key;
  }

  name = `@${name}`;

  if (source === 'terms') {
    return [name, path[Math.min(path.length - 1, 1)]];
  }

  return name;
};

internals.sub = function (paths, skipped) {
  for (const path of paths) {
    for (const skip of skipped) {
      if (DeepEqual(path.slice(0, skip.length), skip)) {
        return true;
      }
    }
  }

  return false;
};

internals.debug = function (state, event) {
  if (state.mainstay.debug) {
    event.path = state.debug ? [...state.path, state.debug] : state.path;
    state.mainstay.debug.push(event);
  }
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/alternatives.js":
/*!**********************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/alternatives.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ../compile */ "./node_modules/@hapi/joi/lib/compile.js");

const Errors = __webpack_require__(/*! ../errors */ "./node_modules/@hapi/joi/lib/errors.js");

const Ref = __webpack_require__(/*! ../ref */ "./node_modules/@hapi/joi/lib/ref.js");

const internals = {};
module.exports = Any.extend({
  type: 'alternatives',
  flags: {
    match: {
      default: 'any'
    } // 'any', 'one', 'all'

  },
  terms: {
    matches: {
      init: [],
      register: Ref.toSibling
    }
  },

  args(schema, ...schemas) {
    if (schemas.length === 1) {
      if (Array.isArray(schemas[0])) {
        return schema.try(...schemas[0]);
      }
    }

    return schema.try(...schemas);
  },

  validate(value, helpers) {
    const {
      schema,
      error,
      state,
      prefs
    } = helpers; // Match all or one

    if (schema._flags.match) {
      let hits = 0;
      let matched;

      for (let i = 0; i < schema.$_terms.matches.length; ++i) {
        const item = schema.$_terms.matches[i];
        const localState = state.nest(item.schema, `match.${i}`);
        localState.snapshot();
        const result = item.schema.$_validate(value, localState, prefs);

        if (!result.errors) {
          ++hits;
          matched = result.value;
        } else {
          localState.restore();
        }
      }

      if (!hits) {
        return {
          errors: error('alternatives.any')
        };
      }

      if (schema._flags.match === 'one') {
        return hits === 1 ? {
          value: matched
        } : {
          errors: error('alternatives.one')
        };
      }

      return hits === schema.$_terms.matches.length ? {
        value
      } : {
        errors: error('alternatives.all')
      };
    } // Match any


    const errors = [];

    for (let i = 0; i < schema.$_terms.matches.length; ++i) {
      const item = schema.$_terms.matches[i]; // Try

      if (item.schema) {
        const localState = state.nest(item.schema, `match.${i}`);
        localState.snapshot();
        const result = item.schema.$_validate(value, localState, prefs);

        if (!result.errors) {
          return result;
        }

        localState.restore();
        errors.push({
          schema: item.schema,
          reports: result.errors
        });
        continue;
      } // Conditional


      const input = item.ref ? item.ref.resolve(value, state, prefs) : value;
      const tests = item.is ? [item] : item.switch;

      for (let j = 0; j < tests.length; ++j) {
        const test = tests[j];
        const {
          is,
          then,
          otherwise
        } = test;
        const id = `match.${i}${item.switch ? '.' + j : ''}`;

        if (!is.$_match(input, state.nest(is, `${id}.is`), prefs)) {
          if (otherwise) {
            return otherwise.$_validate(value, state.nest(otherwise, `${id}.otherwise`), prefs);
          }
        } else if (then) {
          return then.$_validate(value, state.nest(then, `${id}.then`), prefs);
        }
      }
    }

    return internals.errors(errors, helpers);
  },

  rules: {
    conditional: {
      method(condition, options) {
        Assert(!this._flags._endedSwitch, 'Unreachable condition');
        Assert(!this._flags.match, 'Cannot combine match mode', this._flags.match, 'with conditional rule');
        Assert(options.break === undefined, 'Cannot use break option with alternatives conditional');
        const obj = this.clone();
        const match = Compile.when(obj, condition, options);
        const conditions = match.is ? [match] : match.switch;

        for (const item of conditions) {
          if (item.then && item.otherwise) {
            obj.$_setFlag('_endedSwitch', true, {
              clone: false
            });
            break;
          }
        }

        obj.$_terms.matches.push(match);
        return obj.$_mutateRebuild();
      }

    },
    match: {
      method(mode) {
        Assert(['any', 'one', 'all'].includes(mode), 'Invalid alternatives match mode', mode);

        if (mode !== 'any') {
          for (const match of this.$_terms.matches) {
            Assert(match.schema, 'Cannot combine match mode', mode, 'with conditional rules');
          }
        }

        return this.$_setFlag('match', mode);
      }

    },
    try: {
      method(...schemas) {
        Assert(schemas.length, 'Missing alternative schemas');
        Common.verifyFlat(schemas, 'try');
        Assert(!this._flags._endedSwitch, 'Unreachable condition');
        const obj = this.clone();

        for (const schema of schemas) {
          obj.$_terms.matches.push({
            schema: obj.$_compile(schema)
          });
        }

        return obj.$_mutateRebuild();
      }

    }
  },
  overrides: {
    label(name) {
      const obj = this.$_super.label(name);

      const each = (item, source) => source.path[0] !== 'is' ? item.label(name) : undefined;

      return obj.$_modify({
        each,
        ref: false
      });
    }

  },

  rebuild(schema) {
    // Flag when an alternative type is an array
    const each = item => {
      if (Common.isSchema(item) && item.type === 'array') {
        schema.$_setFlag('_arrayItems', true, {
          clone: false
        });
      }
    };

    schema.$_modify({
      each
    });
  },

  manifest: {
    build(obj, desc) {
      if (desc.matches) {
        for (const match of desc.matches) {
          const {
            schema,
            ref,
            is,
            not,
            then,
            otherwise
          } = match;

          if (schema) {
            obj = obj.try(schema);
          } else if (ref) {
            obj = obj.conditional(ref, {
              is,
              then,
              not,
              otherwise,
              switch: match.switch
            });
          } else {
            obj = obj.conditional(is, {
              then,
              otherwise
            });
          }
        }
      }

      return obj;
    }

  },
  messages: {
    'alternatives.all': '{{#label}} does not match all of the required types',
    'alternatives.any': '{{#label}} does not match any of the allowed types',
    'alternatives.match': '{{#label}} does not match any of the allowed types',
    'alternatives.one': '{{#label}} matches more than one allowed type',
    'alternatives.types': '{{#label}} must be one of {{#types}}'
  }
}); // Helpers

internals.errors = function (failures, {
  error,
  state
}) {
  // Nothing matched due to type criteria rules
  if (!failures.length) {
    return {
      errors: error('alternatives.any')
    };
  } // Single error


  if (failures.length === 1) {
    return {
      errors: failures[0].reports
    };
  } // Analyze reasons


  const valids = new Set();
  const complex = [];

  for (const {
    reports,
    schema
  } of failures) {
    // Multiple errors (!abortEarly)
    if (reports.length > 1) {
      return internals.unmatched(failures, error);
    } // Custom error


    const report = reports[0];

    if (report instanceof Errors.Report === false) {
      return internals.unmatched(failures, error);
    } // Internal object or array error


    if (report.state.path.length !== state.path.length) {
      complex.push({
        type: schema.type,
        report
      });
      continue;
    } // Valids


    if (report.code === 'any.only') {
      for (const valid of report.local.valids) {
        valids.add(valid);
      }

      continue;
    } // Base type


    const [type, code] = report.code.split('.');

    if (code !== 'base') {
      complex.push({
        type: schema.type,
        report
      });
      continue;
    }

    valids.add(type);
  } // All errors are base types or valids


  if (!complex.length) {
    return {
      errors: error('alternatives.types', {
        types: [...valids]
      })
    };
  } // Single complex error


  if (complex.length === 1) {
    return {
      errors: complex[0].report
    };
  }

  return internals.unmatched(failures, error);
};

internals.unmatched = function (failures, error) {
  const errors = [];

  for (const failure of failures) {
    errors.push(...failure.reports);
  }

  return {
    errors: error('alternatives.match', Errors.details(errors, {
      override: false
    }))
  };
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/any.js":
/*!*************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/any.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Base = __webpack_require__(/*! ../base */ "./node_modules/@hapi/joi/lib/base.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Messages = __webpack_require__(/*! ../messages */ "./node_modules/@hapi/joi/lib/messages.js");

const internals = {};
module.exports = Base.extend({
  type: 'any',
  flags: {
    only: {
      default: false
    }
  },
  terms: {
    alterations: {
      init: null
    },
    examples: {
      init: null
    },
    externals: {
      init: null
    },
    metas: {
      init: []
    },
    notes: {
      init: []
    },
    shared: {
      init: null
    },
    tags: {
      init: []
    },
    whens: {
      init: null
    }
  },
  rules: {
    custom: {
      method(method, description) {
        Assert(typeof method === 'function', 'Method must be a function');
        Assert(description === undefined || description && typeof description === 'string', 'Description must be a non-empty string');
        return this.$_addRule({
          name: 'custom',
          args: {
            method,
            description
          }
        });
      },

      validate(value, helpers, {
        method
      }) {
        try {
          return method(value, helpers);
        } catch (err) {
          return helpers.error('any.custom', {
            error: err
          });
        }
      },

      args: ['method', 'description'],
      multi: true
    },
    messages: {
      method(messages) {
        return this.prefs({
          messages
        });
      }

    },
    shared: {
      method(schema) {
        Assert(Common.isSchema(schema) && schema._flags.id, 'Schema must be a schema with an id');
        const obj = this.clone();
        obj.$_terms.shared = obj.$_terms.shared || [];
        obj.$_terms.shared.push(schema);
        obj.$_mutateRegister(schema);
        return obj;
      }

    },
    warning: {
      method(code, local) {
        Assert(code && typeof code === 'string', 'Invalid warning code');
        return this.$_addRule({
          name: 'warning',
          args: {
            code,
            local
          },
          warn: true
        });
      },

      validate(value, helpers, {
        code,
        local
      }) {
        return helpers.error(code, local);
      },

      args: ['code', 'local'],
      multi: true
    }
  },
  modifiers: {
    keep(rule, enabled = true) {
      rule.keep = enabled;
    },

    message(rule, message) {
      rule.message = Messages.compile(message);
    },

    warn(rule, enabled = true) {
      rule.warn = enabled;
    }

  },
  manifest: {
    build(obj, desc) {
      for (const key in desc) {
        const values = desc[key];

        if (['examples', 'externals', 'metas', 'notes', 'tags'].includes(key)) {
          for (const value of values) {
            obj = obj[key.slice(0, -1)](value);
          }

          continue;
        }

        if (key === 'alterations') {
          const alter = {};

          for (const {
            target,
            adjuster
          } of values) {
            alter[target] = adjuster;
          }

          obj = obj.alter(alter);
          continue;
        }

        if (key === 'whens') {
          for (const value of values) {
            const {
              ref,
              is,
              not,
              then,
              otherwise,
              concat
            } = value;

            if (concat) {
              obj = obj.concat(concat);
            } else if (ref) {
              obj = obj.when(ref, {
                is,
                not,
                then,
                otherwise,
                switch: value.switch,
                break: value.break
              });
            } else {
              obj = obj.when(is, {
                then,
                otherwise,
                break: value.break
              });
            }
          }

          continue;
        }

        if (key === 'shared') {
          for (const value of values) {
            obj = obj.shared(value);
          }
        }
      }

      return obj;
    }

  },
  messages: {
    'any.custom': '{{#label}} failed custom validation because {{#error.message}}',
    'any.default': '{{#label}} threw an error when running default method',
    'any.failover': '{{#label}} threw an error when running failover method',
    'any.invalid': '{{#label}} contains an invalid value',
    'any.only': '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
    'any.ref': '{{#label}} {{#arg}} references "{{#ref}}" which {{#reason}}',
    'any.required': '{{#label}} is required',
    'any.unknown': '{{#label}} is not allowed'
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/array.js":
/*!***************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const DeepEqual = __webpack_require__(/*! @hapi/hoek/lib/deepEqual */ "./node_modules/@hapi/hoek/lib/deepEqual.js");

const Reach = __webpack_require__(/*! @hapi/hoek/lib/reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ../compile */ "./node_modules/@hapi/joi/lib/compile.js");

const internals = {};
module.exports = Any.extend({
  type: 'array',
  flags: {
    single: {
      default: false
    },
    sparse: {
      default: false
    }
  },
  terms: {
    items: {
      init: [],
      manifest: 'schema'
    },
    ordered: {
      init: [],
      manifest: 'schema'
    },
    _exclusions: {
      init: []
    },
    _inclusions: {
      init: []
    },
    _requireds: {
      init: []
    }
  },
  coerce: {
    from: 'object',

    method(value, {
      schema,
      state,
      prefs
    }) {
      if (!Array.isArray(value)) {
        return;
      }

      const sort = schema.$_getRule('sort');

      if (!sort) {
        return;
      }

      return internals.sort(schema, value, sort.args.options, state, prefs);
    }

  },

  validate(value, {
    schema,
    error
  }) {
    if (!Array.isArray(value)) {
      if (schema._flags.single) {
        const single = [value];
        single[Common.symbols.arraySingle] = true;
        return {
          value: single
        };
      }

      return {
        errors: error('array.base')
      };
    }

    if (!schema.$_getRule('items') && !schema.$_terms.externals) {
      return;
    }

    return {
      value: value.slice()
    }; // Clone the array so that we don't modify the original
  },

  rules: {
    has: {
      method(schema) {
        schema = this.$_compile(schema, {
          appendPath: true
        });
        const obj = this.$_addRule({
          name: 'has',
          args: {
            schema
          }
        });
        obj.$_mutateRegister(schema);
        return obj;
      },

      validate(value, {
        state,
        prefs,
        error
      }, {
        schema: has
      }) {
        const ancestors = [value, ...state.ancestors];

        for (let i = 0; i < value.length; ++i) {
          const localState = state.localize([...state.path, i], ancestors, has);

          if (has.$_match(value[i], localState, prefs)) {
            return value;
          }
        }

        const patternLabel = has._flags.label;

        if (patternLabel) {
          return error('array.hasKnown', {
            patternLabel
          });
        }

        return error('array.hasUnknown', null);
      },

      multi: true
    },
    items: {
      method(...schemas) {
        Common.verifyFlat(schemas, 'items');
        const obj = this.$_addRule('items');

        for (let i = 0; i < schemas.length; ++i) {
          const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, {
            append: true
          });
          obj.$_terms.items.push(type);
        }

        return obj.$_mutateRebuild();
      },

      validate(value, {
        schema,
        error,
        state,
        prefs
      }) {
        const requireds = schema.$_terms._requireds.slice();

        const ordereds = schema.$_terms.ordered.slice();
        const inclusions = [...schema.$_terms._inclusions, ...requireds];
        const wasArray = !value[Common.symbols.arraySingle];
        delete value[Common.symbols.arraySingle];
        const errors = [];
        let il = value.length;

        for (let i = 0; i < il; ++i) {
          const item = value[i];
          let errored = false;
          let isValid = false;
          const key = wasArray ? i : new Number(i); // eslint-disable-line no-new-wrappers

          const path = [...state.path, key]; // Sparse

          if (!schema._flags.sparse && item === undefined) {
            errors.push(error('array.sparse', {
              key,
              path,
              pos: i,
              value: undefined
            }, state.localize(path)));

            if (prefs.abortEarly) {
              return errors;
            }

            ordereds.shift();
            continue;
          } // Exclusions


          const ancestors = [value, ...state.ancestors];

          for (const exclusion of schema.$_terms._exclusions) {
            if (!exclusion.$_match(item, state.localize(path, ancestors, exclusion), prefs, {
              presence: 'ignore'
            })) {
              continue;
            }

            errors.push(error('array.excludes', {
              pos: i,
              value: item
            }, state.localize(path)));

            if (prefs.abortEarly) {
              return errors;
            }

            errored = true;
            ordereds.shift();
            break;
          }

          if (errored) {
            continue;
          } // Ordered


          if (schema.$_terms.ordered.length) {
            if (ordereds.length) {
              const ordered = ordereds.shift();
              const res = ordered.$_validate(item, state.localize(path, ancestors, ordered), prefs);

              if (!res.errors) {
                if (ordered._flags.result === 'strip') {
                  internals.fastSplice(value, i);
                  --i;
                  --il;
                } else if (!schema._flags.sparse && res.value === undefined) {
                  errors.push(error('array.sparse', {
                    key,
                    path,
                    pos: i,
                    value: undefined
                  }, state.localize(path)));

                  if (prefs.abortEarly) {
                    return errors;
                  }

                  continue;
                } else {
                  value[i] = res.value;
                }
              } else {
                errors.push(...res.errors);

                if (prefs.abortEarly) {
                  return errors;
                }
              }

              continue;
            } else if (!schema.$_terms.items.length) {
              errors.push(error('array.orderedLength', {
                pos: i,
                limit: schema.$_terms.ordered.length
              }));

              if (prefs.abortEarly) {
                return errors;
              }

              break; // No reason to continue since there are no other rules to validate other than array.orderedLength
            }
          } // Requireds


          const requiredChecks = [];
          let jl = requireds.length;

          for (let j = 0; j < jl; ++j) {
            const localState = state.localize(path, ancestors, requireds[j]);
            localState.snapshot();
            const res = requireds[j].$_validate(item, localState, prefs);
            requiredChecks[j] = res;

            if (!res.errors) {
              value[i] = res.value;
              isValid = true;
              internals.fastSplice(requireds, j);
              --j;
              --jl;

              if (!schema._flags.sparse && res.value === undefined) {
                errors.push(error('array.sparse', {
                  key,
                  path,
                  pos: i,
                  value: undefined
                }, state.localize(path)));

                if (prefs.abortEarly) {
                  return errors;
                }
              }

              break;
            }

            localState.restore();
          }

          if (isValid) {
            continue;
          } // Inclusions


          const stripUnknown = prefs.stripUnknown && !!prefs.stripUnknown.arrays || false;
          jl = inclusions.length;

          for (const inclusion of inclusions) {
            // Avoid re-running requireds that already didn't match in the previous loop
            let res;
            const previousCheck = requireds.indexOf(inclusion);

            if (previousCheck !== -1) {
              res = requiredChecks[previousCheck];
            } else {
              const localState = state.localize(path, ancestors, inclusion);
              localState.snapshot();
              res = inclusion.$_validate(item, localState, prefs);

              if (!res.errors) {
                if (inclusion._flags.result === 'strip') {
                  internals.fastSplice(value, i);
                  --i;
                  --il;
                } else if (!schema._flags.sparse && res.value === undefined) {
                  errors.push(error('array.sparse', {
                    key,
                    path,
                    pos: i,
                    value: undefined
                  }, state.localize(path)));
                  errored = true;
                } else {
                  value[i] = res.value;
                }

                isValid = true;
                break;
              }

              localState.restore();
            } // Return the actual error if only one inclusion defined


            if (jl === 1) {
              if (stripUnknown) {
                internals.fastSplice(value, i);
                --i;
                --il;
                isValid = true;
                break;
              }

              errors.push(...res.errors);

              if (prefs.abortEarly) {
                return errors;
              }

              errored = true;
              break;
            }
          }

          if (errored) {
            continue;
          }

          if (schema.$_terms._inclusions.length && !isValid) {
            if (stripUnknown) {
              internals.fastSplice(value, i);
              --i;
              --il;
              continue;
            }

            errors.push(error('array.includes', {
              pos: i,
              value: item
            }, state.localize(path)));

            if (prefs.abortEarly) {
              return errors;
            }
          }
        }

        if (requireds.length) {
          internals.fillMissedErrors(schema, errors, requireds, value, state, prefs);
        }

        if (ordereds.length) {
          internals.fillOrderedErrors(schema, errors, ordereds, value, state, prefs);
        }

        return errors.length ? errors : value;
      },

      priority: true,
      manifest: false
    },
    length: {
      method(limit) {
        return this.$_addRule({
          name: 'length',
          args: {
            limit
          },
          operator: '='
        });
      },

      validate(value, helpers, {
        limit
      }, {
        name,
        operator,
        args
      }) {
        if (Common.compare(value.length, limit, operator)) {
          return value;
        }

        return helpers.error('array.' + name, {
          limit: args.limit,
          value
        });
      },

      args: [{
        name: 'limit',
        ref: true,
        assert: Common.limit,
        message: 'must be a positive integer'
      }]
    },
    max: {
      method(limit) {
        return this.$_addRule({
          name: 'max',
          method: 'length',
          args: {
            limit
          },
          operator: '<='
        });
      }

    },
    min: {
      method(limit) {
        return this.$_addRule({
          name: 'min',
          method: 'length',
          args: {
            limit
          },
          operator: '>='
        });
      }

    },
    ordered: {
      method(...schemas) {
        Common.verifyFlat(schemas, 'ordered');
        const obj = this.$_addRule('items');

        for (let i = 0; i < schemas.length; ++i) {
          const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, {
            append: true
          });
          internals.validateSingle(type, obj);
          obj.$_mutateRegister(type);
          obj.$_terms.ordered.push(type);
        }

        return obj.$_mutateRebuild();
      }

    },
    single: {
      method(enabled) {
        const value = enabled === undefined ? true : !!enabled;
        Assert(!value || !this._flags._arrayItems, 'Cannot specify single rule when array has array items');
        return this.$_setFlag('single', value);
      }

    },
    sort: {
      method(options = {}) {
        Common.assertOptions(options, ['by', 'order']);
        const settings = {
          order: options.order || 'ascending'
        };

        if (options.by) {
          settings.by = Compile.ref(options.by, {
            ancestor: 0
          });
          Assert(!settings.by.ancestor, 'Cannot sort by ancestor');
        }

        return this.$_addRule({
          name: 'sort',
          args: {
            options: settings
          }
        });
      },

      validate(value, {
        error,
        state,
        prefs,
        schema
      }, {
        options
      }) {
        const {
          value: sorted,
          errors
        } = internals.sort(schema, value, options, state, prefs);

        if (errors) {
          return errors;
        }

        for (let i = 0; i < value.length; ++i) {
          if (value[i] !== sorted[i]) {
            return error('array.sort', {
              order: options.order,
              by: options.by ? options.by.key : 'value'
            });
          }
        }

        return value;
      },

      convert: true
    },
    sparse: {
      method(enabled) {
        const value = enabled === undefined ? true : !!enabled;

        if (this._flags.sparse === value) {
          return this;
        }

        const obj = value ? this.clone() : this.$_addRule('items');
        return obj.$_setFlag('sparse', value, {
          clone: false
        });
      }

    },
    unique: {
      method(comparator, options = {}) {
        Assert(!comparator || typeof comparator === 'function' || typeof comparator === 'string', 'comparator must be a function or a string');
        Common.assertOptions(options, ['ignoreUndefined', 'separator']);
        const rule = {
          name: 'unique',
          args: {
            options,
            comparator
          }
        };

        if (comparator) {
          if (typeof comparator === 'string') {
            const separator = Common.default(options.separator, '.');
            rule.path = separator ? comparator.split(separator) : [comparator];
          } else {
            rule.comparator = comparator;
          }
        }

        return this.$_addRule(rule);
      },

      validate(value, {
        state,
        error,
        schema
      }, {
        comparator: raw,
        options
      }, {
        comparator,
        path
      }) {
        const found = {
          string: Object.create(null),
          number: Object.create(null),
          undefined: Object.create(null),
          boolean: Object.create(null),
          object: new Map(),
          function: new Map(),
          custom: new Map()
        };
        const compare = comparator || DeepEqual;
        const ignoreUndefined = options.ignoreUndefined;

        for (let i = 0; i < value.length; ++i) {
          const item = path ? Reach(value[i], path) : value[i];
          const records = comparator ? found.custom : found[typeof item];
          Assert(records, 'Failed to find unique map container for type', typeof item);

          if (records instanceof Map) {
            const entries = records.entries();
            let current;

            while (!(current = entries.next()).done) {
              if (compare(current.value[0], item)) {
                const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
                const context = {
                  pos: i,
                  value: value[i],
                  dupePos: current.value[1],
                  dupeValue: value[current.value[1]]
                };

                if (path) {
                  context.path = raw;
                }

                return error('array.unique', context, localState);
              }
            }

            records.set(item, i);
          } else {
            if ((!ignoreUndefined || item !== undefined) && records[item] !== undefined) {
              const context = {
                pos: i,
                value: value[i],
                dupePos: records[item],
                dupeValue: value[records[item]]
              };

              if (path) {
                context.path = raw;
              }

              const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
              return error('array.unique', context, localState);
            }

            records[item] = i;
          }
        }

        return value;
      },

      args: ['comparator', 'options'],
      multi: true
    }
  },
  cast: {
    set: {
      from: Array.isArray,

      to(value, helpers) {
        return new Set(value);
      }

    }
  },

  rebuild(schema) {
    schema.$_terms._inclusions = [];
    schema.$_terms._exclusions = [];
    schema.$_terms._requireds = [];

    for (const type of schema.$_terms.items) {
      internals.validateSingle(type, schema);

      if (type._flags.presence === 'required') {
        schema.$_terms._requireds.push(type);
      } else if (type._flags.presence === 'forbidden') {
        schema.$_terms._exclusions.push(type);
      } else {
        schema.$_terms._inclusions.push(type);
      }
    }

    for (const type of schema.$_terms.ordered) {
      internals.validateSingle(type, schema);
    }
  },

  manifest: {
    build(obj, desc) {
      if (desc.items) {
        obj = obj.items(...desc.items);
      }

      if (desc.ordered) {
        obj = obj.ordered(...desc.ordered);
      }

      return obj;
    }

  },
  messages: {
    'array.base': '{{#label}} must be an array',
    'array.excludes': '{{#label}} contains an excluded value',
    'array.hasKnown': '{{#label}} does not contain at least one required match for type "{#patternLabel}"',
    'array.hasUnknown': '{{#label}} does not contain at least one required match',
    'array.includes': '{{#label}} does not match any of the allowed types',
    'array.includesRequiredBoth': '{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)',
    'array.includesRequiredKnowns': '{{#label}} does not contain {{#knownMisses}}',
    'array.includesRequiredUnknowns': '{{#label}} does not contain {{#unknownMisses}} required value(s)',
    'array.length': '{{#label}} must contain {{#limit}} items',
    'array.max': '{{#label}} must contain less than or equal to {{#limit}} items',
    'array.min': '{{#label}} must contain at least {{#limit}} items',
    'array.orderedLength': '{{#label}} must contain at most {{#limit}} items',
    'array.sort': '{{#label}} must be sorted in {#order} order by {{#by}}',
    'array.sort.mismatching': '{{#label}} cannot be sorted due to mismatching types',
    'array.sort.unsupported': '{{#label}} cannot be sorted due to unsupported type {#type}',
    'array.sparse': '{{#label}} must not be a sparse array item',
    'array.unique': '{{#label}} contains a duplicate value'
  }
}); // Helpers

internals.fillMissedErrors = function (schema, errors, requireds, value, state, prefs) {
  const knownMisses = [];
  let unknownMisses = 0;

  for (const required of requireds) {
    const label = required._flags.label;

    if (label) {
      knownMisses.push(label);
    } else {
      ++unknownMisses;
    }
  }

  if (knownMisses.length) {
    if (unknownMisses) {
      errors.push(schema.$_createError('array.includesRequiredBoth', value, {
        knownMisses,
        unknownMisses
      }, state, prefs));
    } else {
      errors.push(schema.$_createError('array.includesRequiredKnowns', value, {
        knownMisses
      }, state, prefs));
    }
  } else {
    errors.push(schema.$_createError('array.includesRequiredUnknowns', value, {
      unknownMisses
    }, state, prefs));
  }
};

internals.fillOrderedErrors = function (schema, errors, ordereds, value, state, prefs) {
  const requiredOrdereds = [];

  for (const ordered of ordereds) {
    if (ordered._flags.presence === 'required') {
      requiredOrdereds.push(ordered);
    }
  }

  if (requiredOrdereds.length) {
    internals.fillMissedErrors(schema, errors, requiredOrdereds, value, state, prefs);
  }
};

internals.fastSplice = function (arr, i) {
  let pos = i;

  while (pos < arr.length) {
    arr[pos++] = arr[pos];
  }

  --arr.length;
};

internals.validateSingle = function (type, obj) {
  if (type.type === 'array' || type._flags._arrayItems) {
    Assert(!obj._flags.single, 'Cannot specify array item with single rule enabled');
    obj.$_setFlag('_arrayItems', true, {
      clone: false
    });
  }
};

internals.sort = function (schema, value, settings, state, prefs) {
  const order = settings.order === 'ascending' ? 1 : -1;
  const aFirst = -1 * order;
  const bFirst = order;

  const sort = (a, b) => {
    let compare = internals.compare(a, b, aFirst, bFirst);

    if (compare !== null) {
      return compare;
    }

    if (settings.by) {
      a = settings.by.resolve(a, state, prefs);
      b = settings.by.resolve(b, state, prefs);
    }

    compare = internals.compare(a, b, aFirst, bFirst);

    if (compare !== null) {
      return compare;
    }

    const type = typeof a;

    if (type !== typeof b) {
      throw schema.$_createError('array.sort.mismatching', value, null, state, prefs);
    }

    if (type !== 'number' && type !== 'string') {
      throw schema.$_createError('array.sort.unsupported', value, {
        type
      }, state, prefs);
    }

    if (type === 'number') {
      return (a - b) * order;
    }

    return a < b ? aFirst : bFirst;
  };

  try {
    return {
      value: value.slice().sort(sort)
    };
  } catch (err) {
    return {
      errors: err
    };
  }
};

internals.compare = function (a, b, aFirst, bFirst) {
  if (a === b) {
    return 0;
  }

  if (a === undefined) {
    return 1; // Always last regardless of sort order
  }

  if (b === undefined) {
    return -1; // Always last regardless of sort order
  }

  if (a === null) {
    return bFirst;
  }

  if (b === null) {
    return aFirst;
  }

  return null;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/binary.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/binary.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {};
module.exports = Any.extend({
  type: 'binary',
  coerce: {
    from: 'string',

    method(value, {
      schema
    }) {
      try {
        return {
          value: Buffer.from(value, schema._flags.encoding)
        };
      } catch (ignoreErr) {}
    }

  },

  validate(value, {
    error
  }) {
    if (!Buffer.isBuffer(value)) {
      return {
        value,
        errors: error('binary.base')
      };
    }
  },

  rules: {
    encoding: {
      method(encoding) {
        Assert(Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);
        return this.$_setFlag('encoding', encoding);
      }

    },
    length: {
      method(limit) {
        return this.$_addRule({
          name: 'length',
          method: 'length',
          args: {
            limit
          },
          operator: '='
        });
      },

      validate(value, helpers, {
        limit
      }, {
        name,
        operator,
        args
      }) {
        if (Common.compare(value.length, limit, operator)) {
          return value;
        }

        return helpers.error('binary.' + name, {
          limit: args.limit,
          value
        });
      },

      args: [{
        name: 'limit',
        ref: true,
        assert: Common.limit,
        message: 'must be a positive integer'
      }]
    },
    max: {
      method(limit) {
        return this.$_addRule({
          name: 'max',
          method: 'length',
          args: {
            limit
          },
          operator: '<='
        });
      }

    },
    min: {
      method(limit) {
        return this.$_addRule({
          name: 'min',
          method: 'length',
          args: {
            limit
          },
          operator: '>='
        });
      }

    }
  },
  cast: {
    string: {
      from: value => Buffer.isBuffer(value),

      to(value, helpers) {
        return value.toString();
      }

    }
  },
  messages: {
    'binary.base': '{{#label}} must be a buffer or a string',
    'binary.length': '{{#label}} must be {{#limit}} bytes',
    'binary.max': '{{#label}} must be less than or equal to {{#limit}} bytes',
    'binary.min': '{{#label}} must be at least {{#limit}} bytes'
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/boolean.js":
/*!*****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/boolean.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Values = __webpack_require__(/*! ../values */ "./node_modules/@hapi/joi/lib/values.js");

const internals = {};

internals.isBool = function (value) {
  return typeof value === 'boolean';
};

module.exports = Any.extend({
  type: 'boolean',
  flags: {
    sensitive: {
      default: false
    }
  },
  terms: {
    falsy: {
      init: null,
      manifest: 'values'
    },
    truthy: {
      init: null,
      manifest: 'values'
    }
  },

  coerce(value, {
    schema
  }) {
    if (typeof value === 'boolean') {
      return;
    }

    if (typeof value === 'string') {
      const normalized = schema._flags.sensitive ? value : value.toLowerCase();
      value = normalized === 'true' ? true : normalized === 'false' ? false : value;
    }

    if (typeof value !== 'boolean') {
      value = schema.$_terms.truthy && schema.$_terms.truthy.has(value, null, null, !schema._flags.sensitive) || (schema.$_terms.falsy && schema.$_terms.falsy.has(value, null, null, !schema._flags.sensitive) ? false : value);
    }

    return {
      value
    };
  },

  validate(value, {
    error
  }) {
    if (typeof value !== 'boolean') {
      return {
        value,
        errors: error('boolean.base')
      };
    }
  },

  rules: {
    truthy: {
      method(...values) {
        Common.verifyFlat(values, 'truthy');
        const obj = this.clone();
        obj.$_terms.truthy = obj.$_terms.truthy || new Values();

        for (let i = 0; i < values.length; ++i) {
          const value = values[i];
          Assert(value !== undefined, 'Cannot call truthy with undefined');
          obj.$_terms.truthy.add(value);
        }

        return obj;
      }

    },
    falsy: {
      method(...values) {
        Common.verifyFlat(values, 'falsy');
        const obj = this.clone();
        obj.$_terms.falsy = obj.$_terms.falsy || new Values();

        for (let i = 0; i < values.length; ++i) {
          const value = values[i];
          Assert(value !== undefined, 'Cannot call falsy with undefined');
          obj.$_terms.falsy.add(value);
        }

        return obj;
      }

    },
    sensitive: {
      method(enabled = true) {
        return this.$_setFlag('sensitive', enabled);
      }

    }
  },
  cast: {
    number: {
      from: internals.isBool,

      to(value, helpers) {
        return value ? 1 : 0;
      }

    },
    string: {
      from: internals.isBool,

      to(value, helpers) {
        return value ? 'true' : 'false';
      }

    }
  },
  manifest: {
    build(obj, desc) {
      if (desc.truthy) {
        obj = obj.truthy(...desc.truthy);
      }

      if (desc.falsy) {
        obj = obj.falsy(...desc.falsy);
      }

      return obj;
    }

  },
  messages: {
    'boolean.base': '{{#label}} must be a boolean'
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/date.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/date.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Template = __webpack_require__(/*! ../template */ "./node_modules/@hapi/joi/lib/template.js");

const internals = {};

internals.isDate = function (value) {
  return value instanceof Date;
};

module.exports = Any.extend({
  type: 'date',
  coerce: {
    from: ['number', 'string'],

    method(value, {
      schema
    }) {
      return {
        value: internals.parse(value, schema._flags.format) || value
      };
    }

  },

  validate(value, {
    schema,
    error,
    prefs
  }) {
    if (value instanceof Date && !isNaN(value.getTime())) {
      return;
    }

    const format = schema._flags.format;

    if (!prefs.convert || !format || typeof value !== 'string') {
      return {
        value,
        errors: error('date.base')
      };
    }

    return {
      value,
      errors: error('date.format', {
        format
      })
    };
  },

  rules: {
    compare: {
      method: false,

      validate(value, helpers, {
        date
      }, {
        name,
        operator,
        args
      }) {
        const to = date === 'now' ? Date.now() : date.getTime();

        if (Common.compare(value.getTime(), to, operator)) {
          return value;
        }

        return helpers.error('date.' + name, {
          limit: args.date,
          value
        });
      },

      args: [{
        name: 'date',
        ref: true,
        normalize: date => {
          return date === 'now' ? date : internals.parse(date);
        },
        assert: date => date !== null,
        message: 'must have a valid date format'
      }]
    },
    format: {
      method(format) {
        Assert(['iso', 'javascript', 'unix'].includes(format), 'Unknown date format', format);
        return this.$_setFlag('format', format);
      }

    },
    greater: {
      method(date) {
        return this.$_addRule({
          name: 'greater',
          method: 'compare',
          args: {
            date
          },
          operator: '>'
        });
      }

    },
    iso: {
      method() {
        return this.format('iso');
      }

    },
    less: {
      method(date) {
        return this.$_addRule({
          name: 'less',
          method: 'compare',
          args: {
            date
          },
          operator: '<'
        });
      }

    },
    max: {
      method(date) {
        return this.$_addRule({
          name: 'max',
          method: 'compare',
          args: {
            date
          },
          operator: '<='
        });
      }

    },
    min: {
      method(date) {
        return this.$_addRule({
          name: 'min',
          method: 'compare',
          args: {
            date
          },
          operator: '>='
        });
      }

    },
    timestamp: {
      method(type = 'javascript') {
        Assert(['javascript', 'unix'].includes(type), '"type" must be one of "javascript, unix"');
        return this.format(type);
      }

    }
  },
  cast: {
    number: {
      from: internals.isDate,

      to(value, helpers) {
        return value.getTime();
      }

    },
    string: {
      from: internals.isDate,

      to(value, {
        prefs
      }) {
        return Template.date(value, prefs);
      }

    }
  },
  messages: {
    'date.base': '{{#label}} must be a valid date',
    'date.format': '{{#label}} must be in {msg("date.format." + #format) || #format} format',
    'date.greater': '{{#label}} must be greater than "{{#limit}}"',
    'date.less': '{{#label}} must be less than "{{#limit}}"',
    'date.max': '{{#label}} must be less than or equal to "{{#limit}}"',
    'date.min': '{{#label}} must be larger than or equal to "{{#limit}}"',
    // Messages used in date.format
    'date.format.iso': 'ISO 8601 date',
    'date.format.javascript': 'timestamp or number of milliseconds',
    'date.format.unix': 'timestamp or number of seconds'
  }
}); // Helpers

internals.parse = function (value, format) {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value !== 'string' && (isNaN(value) || !isFinite(value))) {
    return null;
  }

  if (/^\s*$/.test(value)) {
    return null;
  } // ISO


  if (format === 'iso') {
    if (!Common.isIsoDate(value)) {
      return null;
    }

    return internals.date(value.toString());
  } // Normalize number string


  const original = value;

  if (typeof value === 'string' && /^[+-]?\d+(\.\d+)?$/.test(value)) {
    value = parseFloat(value);
  } // Timestamp


  if (format) {
    if (format === 'javascript') {
      return internals.date(1 * value); // Casting to number
    }

    if (format === 'unix') {
      return internals.date(1000 * value);
    }

    if (typeof original === 'string') {
      return null;
    }
  } // Plain


  return internals.date(value);
};

internals.date = function (value) {
  const date = new Date(value);

  if (!isNaN(date.getTime())) {
    return date;
  }

  return null;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/function.js":
/*!******************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Keys = __webpack_require__(/*! ./keys */ "./node_modules/@hapi/joi/lib/types/keys.js");

const internals = {};
module.exports = Keys.extend({
  type: 'function',
  properties: {
    typeof: 'function'
  },
  rules: {
    arity: {
      method(n) {
        Assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');
        return this.$_addRule({
          name: 'arity',
          args: {
            n
          }
        });
      },

      validate(value, helpers, {
        n
      }) {
        if (value.length === n) {
          return value;
        }

        return helpers.error('function.arity', {
          n
        });
      }

    },
    class: {
      method() {
        return this.$_addRule('class');
      },

      validate(value, helpers) {
        if (/^\s*class\s/.test(value.toString())) {
          return value;
        }

        return helpers.error('function.class', {
          value
        });
      }

    },
    minArity: {
      method(n) {
        Assert(Number.isSafeInteger(n) && n > 0, 'n must be a strict positive integer');
        return this.$_addRule({
          name: 'minArity',
          args: {
            n
          }
        });
      },

      validate(value, helpers, {
        n
      }) {
        if (value.length >= n) {
          return value;
        }

        return helpers.error('function.minArity', {
          n
        });
      }

    },
    maxArity: {
      method(n) {
        Assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');
        return this.$_addRule({
          name: 'maxArity',
          args: {
            n
          }
        });
      },

      validate(value, helpers, {
        n
      }) {
        if (value.length <= n) {
          return value;
        }

        return helpers.error('function.maxArity', {
          n
        });
      }

    }
  },
  messages: {
    'function.arity': '{{#label}} must have an arity of {{#n}}',
    'function.class': '{{#label}} must be a class',
    'function.maxArity': '{{#label}} must have an arity lesser or equal to {{#n}}',
    'function.minArity': '{{#label}} must have an arity greater or equal to {{#n}}'
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/keys.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/keys.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ApplyToDefaults = __webpack_require__(/*! @hapi/hoek/lib/applyToDefaults */ "./node_modules/@hapi/hoek/lib/applyToDefaults.js");

const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Topo = __webpack_require__(/*! @hapi/topo */ "./node_modules/@hapi/topo/lib/index.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ../compile */ "./node_modules/@hapi/joi/lib/compile.js");

const Errors = __webpack_require__(/*! ../errors */ "./node_modules/@hapi/joi/lib/errors.js");

const Ref = __webpack_require__(/*! ../ref */ "./node_modules/@hapi/joi/lib/ref.js");

const Template = __webpack_require__(/*! ../template */ "./node_modules/@hapi/joi/lib/template.js");

const internals = {
  renameDefaults: {
    alias: false,
    // Keep old value in place
    multiple: false,
    // Allow renaming multiple keys into the same target
    override: false // Overrides an existing key

  }
};
module.exports = Any.extend({
  type: '_keys',
  properties: {
    typeof: 'object'
  },
  flags: {
    unknown: {
      default: false
    }
  },
  terms: {
    dependencies: {
      init: null
    },
    keys: {
      init: null,
      manifest: {
        mapped: {
          from: 'schema',
          to: 'key'
        }
      }
    },
    patterns: {
      init: null
    },
    renames: {
      init: null
    }
  },

  args(schema, keys) {
    return schema.keys(keys);
  },

  validate(value, {
    schema,
    error,
    state,
    prefs
  }) {
    if (!value || typeof value !== schema.$_property('typeof') || Array.isArray(value)) {
      return {
        value,
        errors: error('object.base', {
          type: schema.$_property('typeof')
        })
      };
    } // Skip if there are no other rules to test


    if (!schema.$_terms.renames && !schema.$_terms.dependencies && !schema.$_terms.keys && // null allows any keys
    !schema.$_terms.patterns && !schema.$_terms.externals) {
      return;
    } // Shallow clone value


    value = internals.clone(value, prefs);
    const errors = []; // Rename keys

    if (schema.$_terms.renames && !internals.rename(schema, value, state, prefs, errors)) {
      return {
        value,
        errors
      };
    } // Anything allowed


    if (!schema.$_terms.keys && // null allows any keys
    !schema.$_terms.patterns && !schema.$_terms.dependencies) {
      return {
        value,
        errors
      };
    } // Defined keys


    const unprocessed = new Set(Object.keys(value));

    if (schema.$_terms.keys) {
      const ancestors = [value, ...state.ancestors];

      for (const child of schema.$_terms.keys) {
        const key = child.key;
        const item = value[key];
        unprocessed.delete(key);
        const localState = state.localize([...state.path, key], ancestors, child);
        const result = child.schema.$_validate(item, localState, prefs);

        if (result.errors) {
          if (prefs.abortEarly) {
            return {
              value,
              errors: result.errors
            };
          }

          errors.push(...result.errors);
        } else if (child.schema._flags.result === 'strip' || result.value === undefined && item !== undefined) {
          delete value[key];
        } else if (result.value !== undefined) {
          value[key] = result.value;
        }
      }
    } // Unknown keys


    if (unprocessed.size || schema._flags._hasPatternMatch) {
      const early = internals.unknown(schema, value, unprocessed, errors, state, prefs);

      if (early) {
        return early;
      }
    } // Validate dependencies


    if (schema.$_terms.dependencies) {
      for (const dep of schema.$_terms.dependencies) {
        if (dep.key && dep.key.resolve(value, state, prefs, null, {
          shadow: false
        }) === undefined) {
          continue;
        }

        const failed = internals.dependencies[dep.rel](schema, dep, value, state, prefs);

        if (failed) {
          const report = schema.$_createError(failed.code, value, failed.context, state, prefs);

          if (prefs.abortEarly) {
            return {
              value,
              errors: report
            };
          }

          errors.push(report);
        }
      }
    }

    return {
      value,
      errors
    };
  },

  rules: {
    and: {
      method(...peers
      /*, [options] */
      ) {
        Common.verifyFlat(peers, 'and');
        return internals.dependency(this, 'and', null, peers);
      }

    },
    append: {
      method(schema) {
        if (schema === null || schema === undefined || Object.keys(schema).length === 0) {
          return this;
        }

        return this.keys(schema);
      }

    },
    assert: {
      method(subject, schema, message) {
        if (!Template.isTemplate(subject)) {
          subject = Compile.ref(subject);
        }

        Assert(message === undefined || typeof message === 'string', 'Message must be a string');
        schema = this.$_compile(schema, {
          appendPath: true
        });
        const obj = this.$_addRule({
          name: 'assert',
          args: {
            subject,
            schema,
            message
          }
        });
        obj.$_mutateRegister(subject);
        obj.$_mutateRegister(schema);
        return obj;
      },

      validate(value, {
        error,
        prefs,
        state
      }, {
        subject,
        schema,
        message
      }) {
        const about = subject.resolve(value, state, prefs);
        const path = Ref.isRef(subject) ? subject.absolute(state) : [];

        if (schema.$_match(about, state.localize(path, [value, ...state.ancestors], schema), prefs)) {
          return value;
        }

        return error('object.assert', {
          subject,
          message
        });
      },

      args: ['subject', 'schema', 'message'],
      multi: true
    },
    instance: {
      method(constructor, name) {
        Assert(typeof constructor === 'function', 'constructor must be a function');
        name = name || constructor.name;
        return this.$_addRule({
          name: 'instance',
          args: {
            constructor,
            name
          }
        });
      },

      validate(value, helpers, {
        constructor,
        name
      }) {
        if (value instanceof constructor) {
          return value;
        }

        return helpers.error('object.instance', {
          type: name,
          value
        });
      },

      args: ['constructor', 'name']
    },
    keys: {
      method(schema) {
        Assert(schema === undefined || typeof schema === 'object', 'Object schema must be a valid object');
        Assert(!Common.isSchema(schema), 'Object schema cannot be a joi schema');
        const obj = this.clone();

        if (!schema) {
          // Allow all
          obj.$_terms.keys = null;
        } else if (!Object.keys(schema).length) {
          // Allow none
          obj.$_terms.keys = new internals.Keys();
        } else {
          obj.$_terms.keys = obj.$_terms.keys ? obj.$_terms.keys.filter(child => !schema.hasOwnProperty(child.key)) : new internals.Keys();

          for (const key in schema) {
            Common.tryWithPath(() => obj.$_terms.keys.push({
              key,
              schema: this.$_compile(schema[key])
            }), key);
          }
        }

        return obj.$_mutateRebuild();
      }

    },
    length: {
      method(limit) {
        return this.$_addRule({
          name: 'length',
          args: {
            limit
          },
          operator: '='
        });
      },

      validate(value, helpers, {
        limit
      }, {
        name,
        operator,
        args
      }) {
        if (Common.compare(Object.keys(value).length, limit, operator)) {
          return value;
        }

        return helpers.error('object.' + name, {
          limit: args.limit,
          value
        });
      },

      args: [{
        name: 'limit',
        ref: true,
        assert: Common.limit,
        message: 'must be a positive integer'
      }]
    },
    max: {
      method(limit) {
        return this.$_addRule({
          name: 'max',
          method: 'length',
          args: {
            limit
          },
          operator: '<='
        });
      }

    },
    min: {
      method(limit) {
        return this.$_addRule({
          name: 'min',
          method: 'length',
          args: {
            limit
          },
          operator: '>='
        });
      }

    },
    nand: {
      method(...peers
      /*, [options] */
      ) {
        Common.verifyFlat(peers, 'nand');
        return internals.dependency(this, 'nand', null, peers);
      }

    },
    or: {
      method(...peers
      /*, [options] */
      ) {
        Common.verifyFlat(peers, 'or');
        return internals.dependency(this, 'or', null, peers);
      }

    },
    oxor: {
      method(...peers
      /*, [options] */
      ) {
        return internals.dependency(this, 'oxor', null, peers);
      }

    },
    pattern: {
      method(pattern, schema, options = {}) {
        const isRegExp = pattern instanceof RegExp;

        if (!isRegExp) {
          pattern = this.$_compile(pattern, {
            appendPath: true
          });
        }

        Assert(schema !== undefined, 'Invalid rule');
        Common.assertOptions(options, ['fallthrough', 'matches']);

        if (isRegExp) {
          Assert(!pattern.flags.includes('g') && !pattern.flags.includes('y'), 'pattern should not use global or sticky mode');
        }

        schema = this.$_compile(schema, {
          appendPath: true
        });
        const obj = this.clone();
        obj.$_terms.patterns = obj.$_terms.patterns || [];
        const config = {
          [isRegExp ? 'regex' : 'schema']: pattern,
          rule: schema
        };

        if (options.matches) {
          config.matches = this.$_compile(options.matches);

          if (config.matches.type !== 'array') {
            config.matches = config.matches.$_root.array().items(config.matches);
          }

          obj.$_mutateRegister(config.matches);
          obj.$_setFlag('_hasPatternMatch', true, {
            clone: false
          });
        }

        if (options.fallthrough) {
          config.fallthrough = true;
        }

        obj.$_terms.patterns.push(config);
        obj.$_mutateRegister(schema);
        return obj;
      }

    },
    ref: {
      method() {
        return this.$_addRule('ref');
      },

      validate(value, helpers) {
        if (Ref.isRef(value)) {
          return value;
        }

        return helpers.error('object.refType', {
          value
        });
      }

    },
    regex: {
      method() {
        return this.$_addRule('regex');
      },

      validate(value, helpers) {
        if (value instanceof RegExp) {
          return value;
        }

        return helpers.error('object.regex', {
          value
        });
      }

    },
    rename: {
      method(from, to, options = {}) {
        Assert(typeof from === 'string' || from instanceof RegExp, 'Rename missing the from argument');
        Assert(typeof to === 'string' || to instanceof Template, 'Invalid rename to argument');
        Assert(to !== from, 'Cannot rename key to same name:', from);
        Common.assertOptions(options, ['alias', 'ignoreUndefined', 'override', 'multiple']);
        const obj = this.clone();
        obj.$_terms.renames = obj.$_terms.renames || [];

        for (const rename of obj.$_terms.renames) {
          Assert(rename.from !== from, 'Cannot rename the same key multiple times');
        }

        if (to instanceof Template) {
          obj.$_mutateRegister(to);
        }

        obj.$_terms.renames.push({
          from,
          to,
          options: ApplyToDefaults(internals.renameDefaults, options)
        });
        return obj;
      }

    },
    schema: {
      method(type = 'any') {
        return this.$_addRule({
          name: 'schema',
          args: {
            type
          }
        });
      },

      validate(value, helpers, {
        type
      }) {
        if (Common.isSchema(value) && (type === 'any' || value.type === type)) {
          return value;
        }

        return helpers.error('object.schema', {
          type
        });
      }

    },
    unknown: {
      method(allow) {
        return this.$_setFlag('unknown', allow !== false);
      }

    },
    with: {
      method(key, peers, options = {}) {
        return internals.dependency(this, 'with', key, peers, options);
      }

    },
    without: {
      method(key, peers, options = {}) {
        return internals.dependency(this, 'without', key, peers, options);
      }

    },
    xor: {
      method(...peers
      /*, [options] */
      ) {
        Common.verifyFlat(peers, 'xor');
        return internals.dependency(this, 'xor', null, peers);
      }

    }
  },
  overrides: {
    default(value, options) {
      if (value === undefined) {
        value = Common.symbols.deepDefault;
      }

      return this.$_super.default(value, options);
    }

  },

  rebuild(schema) {
    if (schema.$_terms.keys) {
      const topo = new Topo.Sorter();

      for (const child of schema.$_terms.keys) {
        Common.tryWithPath(() => topo.add(child, {
          after: child.schema.$_rootReferences(),
          group: child.key
        }), child.key);
      }

      schema.$_terms.keys = new internals.Keys(...topo.nodes);
    }
  },

  manifest: {
    build(obj, desc) {
      if (desc.keys) {
        obj = obj.keys(desc.keys);
      }

      if (desc.dependencies) {
        for (const {
          rel,
          key = null,
          peers,
          options
        } of desc.dependencies) {
          obj = internals.dependency(obj, rel, key, peers, options);
        }
      }

      if (desc.patterns) {
        for (const {
          regex,
          schema,
          rule,
          fallthrough,
          matches
        } of desc.patterns) {
          obj = obj.pattern(regex || schema, rule, {
            fallthrough,
            matches
          });
        }
      }

      if (desc.renames) {
        for (const {
          from,
          to,
          options
        } of desc.renames) {
          obj = obj.rename(from, to, options);
        }
      }

      return obj;
    }

  },
  messages: {
    'object.and': '{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}',
    'object.assert': '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}',
    'object.base': '{{#label}} must be of type {{#type}}',
    'object.instance': '{{#label}} must be an instance of "{{#type}}"',
    'object.length': '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}',
    'object.max': '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}',
    'object.min': '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}',
    'object.missing': '{{#label}} must contain at least one of {{#peersWithLabels}}',
    'object.nand': '"{{#mainWithLabel}}" must not exist simultaneously with {{#peersWithLabels}}',
    'object.oxor': '{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}',
    'object.pattern.match': '{{#label}} keys failed to match pattern requirements',
    'object.refType': '{{#label}} must be a Joi reference',
    'object.regex': '{{#label}} must be a RegExp object',
    'object.rename.multiple': '{{#label}} cannot rename "{{#from}}" because multiple renames are disabled and another key was already renamed to "{{#to}}"',
    'object.rename.override': '{{#label}} cannot rename "{{#from}}" because override is disabled and target "{{#to}}" exists',
    'object.schema': '{{#label}} must be a Joi schema of {{#type}} type',
    'object.unknown': '{{#label}} is not allowed',
    'object.with': '"{{#mainWithLabel}}" missing required peer "{{#peerWithLabel}}"',
    'object.without': '"{{#mainWithLabel}}" conflict with forbidden peer "{{#peerWithLabel}}"',
    'object.xor': '{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}'
  }
}); // Helpers

internals.clone = function (value, prefs) {
  // Object
  if (typeof value === 'object') {
    if (prefs.nonEnumerables) {
      return Clone(value, {
        shallow: true
      });
    }

    const clone = Object.create(Object.getPrototypeOf(value));
    Object.assign(clone, value);
    return clone;
  } // Function


  const clone = function (...args) {
    return value.apply(this, args);
  };

  clone.prototype = Clone(value.prototype);
  Object.defineProperty(clone, 'name', {
    value: value.name,
    writable: false
  });
  Object.defineProperty(clone, 'length', {
    value: value.length,
    writable: false
  });
  Object.assign(clone, value);
  return clone;
};

internals.dependency = function (schema, rel, key, peers, options) {
  Assert(key === null || typeof key === 'string', rel, 'key must be a strings'); // Extract options from peers array

  if (!options) {
    options = peers.length > 1 && typeof peers[peers.length - 1] === 'object' ? peers.pop() : {};
  }

  Common.assertOptions(options, ['separator']);
  peers = [].concat(peers); // Cast peer paths

  const separator = Common.default(options.separator, '.');
  const paths = [];

  for (const peer of peers) {
    Assert(typeof peer === 'string', rel, 'peers must be a string or a reference');
    paths.push(Compile.ref(peer, {
      separator,
      ancestor: 0,
      prefix: false
    }));
  } // Cast key


  if (key !== null) {
    key = Compile.ref(key, {
      separator,
      ancestor: 0,
      prefix: false
    });
  } // Add rule


  const obj = schema.clone();
  obj.$_terms.dependencies = obj.$_terms.dependencies || [];
  obj.$_terms.dependencies.push(new internals.Dependency(rel, key, paths, peers));
  return obj;
};

internals.dependencies = {
  and(schema, dep, value, state, prefs) {
    const missing = [];
    const present = [];
    const count = dep.peers.length;

    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) === undefined) {
        missing.push(peer.key);
      } else {
        present.push(peer.key);
      }
    }

    if (missing.length !== count && present.length !== count) {
      return {
        code: 'object.and',
        context: {
          present,
          presentWithLabels: internals.keysToLabels(schema, present),
          missing,
          missingWithLabels: internals.keysToLabels(schema, missing)
        }
      };
    }
  },

  nand(schema, dep, value, state, prefs) {
    const present = [];

    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) !== undefined) {
        present.push(peer.key);
      }
    }

    if (present.length !== dep.peers.length) {
      return;
    }

    const main = dep.paths[0];
    const values = dep.paths.slice(1);
    return {
      code: 'object.nand',
      context: {
        main,
        mainWithLabel: internals.keysToLabels(schema, main),
        peers: values,
        peersWithLabels: internals.keysToLabels(schema, values)
      }
    };
  },

  or(schema, dep, value, state, prefs) {
    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) !== undefined) {
        return;
      }
    }

    return {
      code: 'object.missing',
      context: {
        peers: dep.paths,
        peersWithLabels: internals.keysToLabels(schema, dep.paths)
      }
    };
  },

  oxor(schema, dep, value, state, prefs) {
    const present = [];

    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) !== undefined) {
        present.push(peer.key);
      }
    }

    if (!present.length || present.length === 1) {
      return;
    }

    const context = {
      peers: dep.paths,
      peersWithLabels: internals.keysToLabels(schema, dep.paths)
    };
    context.present = present;
    context.presentWithLabels = internals.keysToLabels(schema, present);
    return {
      code: 'object.oxor',
      context
    };
  },

  with(schema, dep, value, state, prefs) {
    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) === undefined) {
        return {
          code: 'object.with',
          context: {
            main: dep.key.key,
            mainWithLabel: internals.keysToLabels(schema, dep.key.key),
            peer: peer.key,
            peerWithLabel: internals.keysToLabels(schema, peer.key)
          }
        };
      }
    }
  },

  without(schema, dep, value, state, prefs) {
    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) !== undefined) {
        return {
          code: 'object.without',
          context: {
            main: dep.key.key,
            mainWithLabel: internals.keysToLabels(schema, dep.key.key),
            peer: peer.key,
            peerWithLabel: internals.keysToLabels(schema, peer.key)
          }
        };
      }
    }
  },

  xor(schema, dep, value, state, prefs) {
    const present = [];

    for (const peer of dep.peers) {
      if (peer.resolve(value, state, prefs, null, {
        shadow: false
      }) !== undefined) {
        present.push(peer.key);
      }
    }

    if (present.length === 1) {
      return;
    }

    const context = {
      peers: dep.paths,
      peersWithLabels: internals.keysToLabels(schema, dep.paths)
    };

    if (present.length === 0) {
      return {
        code: 'object.missing',
        context
      };
    }

    context.present = present;
    context.presentWithLabels = internals.keysToLabels(schema, present);
    return {
      code: 'object.xor',
      context
    };
  }

};

internals.keysToLabels = function (schema, keys) {
  if (Array.isArray(keys)) {
    return keys.map(key => schema.$_mapLabels(key));
  }

  return schema.$_mapLabels(keys);
};

internals.rename = function (schema, value, state, prefs, errors) {
  const renamed = {};

  for (const rename of schema.$_terms.renames) {
    const matches = [];
    const pattern = typeof rename.from !== 'string';

    if (!pattern) {
      if (Object.prototype.hasOwnProperty.call(value, rename.from) && (value[rename.from] !== undefined || !rename.options.ignoreUndefined)) {
        matches.push(rename);
      }
    } else {
      for (const from in value) {
        if (value[from] === undefined && rename.options.ignoreUndefined) {
          continue;
        }

        if (from === rename.to) {
          continue;
        }

        const match = rename.from.exec(from);

        if (!match) {
          continue;
        }

        matches.push({
          from,
          to: rename.to,
          match
        });
      }
    }

    for (const match of matches) {
      const from = match.from;
      let to = match.to;

      if (to instanceof Template) {
        to = to.render(value, state, prefs, match.match);
      }

      if (from === to) {
        continue;
      }

      if (!rename.options.multiple && renamed[to]) {
        errors.push(schema.$_createError('object.rename.multiple', value, {
          from,
          to,
          pattern
        }, state, prefs));

        if (prefs.abortEarly) {
          return false;
        }
      }

      if (Object.prototype.hasOwnProperty.call(value, to) && !rename.options.override && !renamed[to]) {
        errors.push(schema.$_createError('object.rename.override', value, {
          from,
          to,
          pattern
        }, state, prefs));

        if (prefs.abortEarly) {
          return false;
        }
      }

      if (value[from] === undefined) {
        delete value[to];
      } else {
        value[to] = value[from];
      }

      renamed[to] = true;

      if (!rename.options.alias) {
        delete value[from];
      }
    }
  }

  return true;
};

internals.unknown = function (schema, value, unprocessed, errors, state, prefs) {
  if (schema.$_terms.patterns) {
    let hasMatches = false;
    const matches = schema.$_terms.patterns.map(pattern => {
      if (pattern.matches) {
        hasMatches = true;
        return [];
      }
    });
    const ancestors = [value, ...state.ancestors];

    for (const key of unprocessed) {
      const item = value[key];
      const path = [...state.path, key];

      for (let i = 0; i < schema.$_terms.patterns.length; ++i) {
        const pattern = schema.$_terms.patterns[i];

        if (pattern.regex) {
          const match = pattern.regex.test(key);
          state.mainstay.tracer.debug(state, 'rule', `pattern.${i}`, match ? 'pass' : 'error');

          if (!match) {
            continue;
          }
        } else {
          if (!pattern.schema.$_match(key, state.nest(pattern.schema, `pattern.${i}`), prefs)) {
            continue;
          }
        }

        unprocessed.delete(key);
        const localState = state.localize(path, ancestors, {
          schema: pattern.rule,
          key
        });
        const result = pattern.rule.$_validate(item, localState, prefs);

        if (result.errors) {
          if (prefs.abortEarly) {
            return {
              value,
              errors: result.errors
            };
          }

          errors.push(...result.errors);
        }

        if (pattern.matches) {
          matches[i].push(key);
        }

        value[key] = result.value;

        if (!pattern.fallthrough) {
          break;
        }
      }
    } // Validate pattern matches rules


    if (hasMatches) {
      for (let i = 0; i < matches.length; ++i) {
        const match = matches[i];

        if (!match) {
          continue;
        }

        const stpm = schema.$_terms.patterns[i].matches;
        const localState = state.localize(state.path, ancestors, stpm);
        const result = stpm.$_validate(match, localState, prefs);

        if (result.errors) {
          const details = Errors.details(result.errors, {
            override: false
          });
          details.matches = match;
          const report = schema.$_createError('object.pattern.match', value, details, state, prefs);

          if (prefs.abortEarly) {
            return {
              value,
              errors: report
            };
          }

          errors.push(report);
        }
      }
    }
  }

  if (!unprocessed.size || !schema.$_terms.keys && !schema.$_terms.patterns) {
    // If no keys or patterns specified, unknown keys allowed
    return;
  }

  if (prefs.stripUnknown && !schema._flags.unknown || prefs.skipFunctions) {
    const stripUnknown = prefs.stripUnknown ? prefs.stripUnknown === true ? true : !!prefs.stripUnknown.objects : false;

    for (const key of unprocessed) {
      if (stripUnknown) {
        delete value[key];
        unprocessed.delete(key);
      } else if (typeof value[key] === 'function') {
        unprocessed.delete(key);
      }
    }
  }

  const forbidUnknown = !Common.default(schema._flags.unknown, prefs.allowUnknown);

  if (forbidUnknown) {
    for (const unprocessedKey of unprocessed) {
      const localState = state.localize([...state.path, unprocessedKey], []);
      const report = schema.$_createError('object.unknown', value[unprocessedKey], {
        child: unprocessedKey
      }, localState, prefs, {
        flags: false
      });

      if (prefs.abortEarly) {
        return {
          value,
          errors: report
        };
      }

      errors.push(report);
    }
  }
};

internals.Dependency = class {
  constructor(rel, key, peers, paths) {
    this.rel = rel;
    this.key = key;
    this.peers = peers;
    this.paths = paths;
  }

  describe() {
    const desc = {
      rel: this.rel,
      peers: this.paths
    };

    if (this.key !== null) {
      desc.key = this.key.key;
    }

    if (this.peers[0].separator !== '.') {
      desc.options = {
        separator: this.peers[0].separator
      };
    }

    return desc;
  }

};
internals.Keys = class extends Array {
  concat(source) {
    const result = this.slice();
    const keys = new Map();

    for (let i = 0; i < result.length; ++i) {
      keys.set(result[i].key, i);
    }

    for (const item of source) {
      const key = item.key;
      const pos = keys.get(key);

      if (pos !== undefined) {
        result[pos] = {
          key,
          schema: result[pos].schema.concat(item.schema)
        };
      } else {
        result.push(item);
      }
    }

    return result;
  }

};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/link.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/link.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const Compile = __webpack_require__(/*! ../compile */ "./node_modules/@hapi/joi/lib/compile.js");

const Errors = __webpack_require__(/*! ../errors */ "./node_modules/@hapi/joi/lib/errors.js");

const internals = {};
module.exports = Any.extend({
  type: 'link',
  properties: {
    schemaChain: true
  },
  terms: {
    link: {
      init: null,
      manifest: 'single',
      register: false
    }
  },

  args(schema, ref) {
    return schema.ref(ref);
  },

  validate(value, {
    schema,
    state,
    prefs
  }) {
    Assert(schema.$_terms.link, 'Uninitialized link schema');
    const linked = internals.generate(schema, value, state, prefs);
    const ref = schema.$_terms.link[0].ref;
    return linked.$_validate(value, state.nest(linked, `link:${ref.display}:${linked.type}`), prefs);
  },

  generate(schema, value, state, prefs) {
    return internals.generate(schema, value, state, prefs);
  },

  rules: {
    ref: {
      method(ref) {
        Assert(!this.$_terms.link, 'Cannot reinitialize schema');
        ref = Compile.ref(ref);
        Assert(ref.type === 'value' || ref.type === 'local', 'Invalid reference type:', ref.type);
        Assert(ref.type === 'local' || ref.ancestor === 'root' || ref.ancestor > 0, 'Link cannot reference itself');
        const obj = this.clone();
        obj.$_terms.link = [{
          ref
        }];
        return obj;
      }

    },
    relative: {
      method(enabled = true) {
        return this.$_setFlag('relative', enabled);
      }

    }
  },
  overrides: {
    concat(source) {
      Assert(this.$_terms.link, 'Uninitialized link schema');
      Assert(Common.isSchema(source), 'Invalid schema object');
      Assert(source.type !== 'link', 'Cannot merge type link with another link');
      const obj = this.clone();

      if (!obj.$_terms.whens) {
        obj.$_terms.whens = [];
      }

      obj.$_terms.whens.push({
        concat: source
      });
      return obj.$_mutateRebuild();
    }

  },
  manifest: {
    build(obj, desc) {
      Assert(desc.link, 'Invalid link description missing link');
      return obj.ref(desc.link);
    }

  }
}); // Helpers

internals.generate = function (schema, value, state, prefs) {
  let linked = state.mainstay.links.get(schema);

  if (linked) {
    return linked._generate(value, state, prefs).schema;
  }

  const ref = schema.$_terms.link[0].ref;
  const {
    perspective,
    path
  } = internals.perspective(ref, state);
  internals.assert(perspective, 'which is outside of schema boundaries', ref, schema, state, prefs);

  try {
    linked = path.length ? perspective.$_reach(path) : perspective;
  } catch (ignoreErr) {
    internals.assert(false, 'to non-existing schema', ref, schema, state, prefs);
  }

  internals.assert(linked.type !== 'link', 'which is another link', ref, schema, state, prefs);

  if (!schema._flags.relative) {
    state.mainstay.links.set(schema, linked);
  }

  return linked._generate(value, state, prefs).schema;
};

internals.perspective = function (ref, state) {
  if (ref.type === 'local') {
    for (const {
      schema,
      key
    } of state.schemas) {
      // From parent to root
      const id = schema._flags.id || key;

      if (id === ref.path[0]) {
        return {
          perspective: schema,
          path: ref.path.slice(1)
        };
      }

      if (schema.$_terms.shared) {
        for (const shared of schema.$_terms.shared) {
          if (shared._flags.id === ref.path[0]) {
            return {
              perspective: shared,
              path: ref.path.slice(1)
            };
          }
        }
      }
    }

    return {
      perspective: null,
      path: null
    };
  }

  if (ref.ancestor === 'root') {
    return {
      perspective: state.schemas[state.schemas.length - 1].schema,
      path: ref.path
    };
  }

  return {
    perspective: state.schemas[ref.ancestor] && state.schemas[ref.ancestor].schema,
    path: ref.path
  };
};

internals.assert = function (condition, message, ref, schema, state, prefs) {
  if (condition) {
    // Manual check to avoid generating error message on success
    return;
  }

  Assert(false, `"${Errors.label(schema._flags, state, prefs)}" contains link reference "${ref.display}" ${message}`);
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/number.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/number.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {
  numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i,
  precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
};
module.exports = Any.extend({
  type: 'number',
  flags: {
    unsafe: {
      default: false
    }
  },
  coerce: {
    from: 'string',

    method(value, {
      schema,
      error
    }) {
      const matches = value.match(internals.numberRx);

      if (!matches) {
        return;
      }

      value = value.trim();
      const result = {
        value: parseFloat(value)
      };

      if (result.value === 0) {
        result.value = 0; // -0
      }

      if (!schema._flags.unsafe) {
        if (value.match(/e/i)) {
          const constructed = internals.normalizeExponent(`${result.value / Math.pow(10, matches[1])}e${matches[1]}`);

          if (constructed !== internals.normalizeExponent(value)) {
            result.errors = error('number.unsafe');
            return result;
          }
        } else {
          const string = result.value.toString();

          if (string.match(/e/i)) {
            return result;
          }

          if (string !== internals.normalizeDecimal(value)) {
            result.errors = error('number.unsafe');
            return result;
          }
        }
      }

      return result;
    }

  },

  validate(value, {
    schema,
    error,
    prefs
  }) {
    if (value === Infinity || value === -Infinity) {
      return {
        value,
        errors: error('number.infinity')
      };
    }

    if (!Common.isNumber(value)) {
      return {
        value,
        errors: error('number.base')
      };
    }

    const result = {
      value
    };

    if (prefs.convert) {
      const rule = schema.$_getRule('precision');

      if (rule) {
        const precision = Math.pow(10, rule.args.limit); // This is conceptually equivalent to using toFixed but it should be much faster

        result.value = Math.round(result.value * precision) / precision;
      }
    }

    if (result.value === 0) {
      result.value = 0; // -0
    }

    if (!schema._flags.unsafe && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
      result.errors = error('number.unsafe');
    }

    return result;
  },

  rules: {
    compare: {
      method: false,

      validate(value, helpers, {
        limit
      }, {
        name,
        operator,
        args
      }) {
        if (Common.compare(value, limit, operator)) {
          return value;
        }

        return helpers.error('number.' + name, {
          limit: args.limit,
          value
        });
      },

      args: [{
        name: 'limit',
        ref: true,
        assert: Common.isNumber,
        message: 'must be a number'
      }]
    },
    greater: {
      method(limit) {
        return this.$_addRule({
          name: 'greater',
          method: 'compare',
          args: {
            limit
          },
          operator: '>'
        });
      }

    },
    integer: {
      method() {
        return this.$_addRule('integer');
      },

      validate(value, helpers) {
        if (Math.trunc(value) - value === 0) {
          return value;
        }

        return helpers.error('number.integer');
      }

    },
    less: {
      method(limit) {
        return this.$_addRule({
          name: 'less',
          method: 'compare',
          args: {
            limit
          },
          operator: '<'
        });
      }

    },
    max: {
      method(limit) {
        return this.$_addRule({
          name: 'max',
          method: 'compare',
          args: {
            limit
          },
          operator: '<='
        });
      }

    },
    min: {
      method(limit) {
        return this.$_addRule({
          name: 'min',
          method: 'compare',
          args: {
            limit
          },
          operator: '>='
        });
      }

    },
    multiple: {
      method(base) {
        return this.$_addRule({
          name: 'multiple',
          args: {
            base
          }
        });
      },

      validate(value, helpers, {
        base
      }, options) {
        if (value % base === 0) {
          return value;
        }

        return helpers.error('number.multiple', {
          multiple: options.args.base,
          value
        });
      },

      args: [{
        name: 'base',
        ref: true,
        assert: value => typeof value === 'number' && isFinite(value) && value > 0,
        message: 'must be a positive number'
      }],
      multi: true
    },
    negative: {
      method() {
        return this.sign('negative');
      }

    },
    port: {
      method() {
        return this.$_addRule('port');
      },

      validate(value, helpers) {
        if (Number.isSafeInteger(value) && value >= 0 && value <= 65535) {
          return value;
        }

        return helpers.error('number.port');
      }

    },
    positive: {
      method() {
        return this.sign('positive');
      }

    },
    precision: {
      method(limit) {
        Assert(Number.isSafeInteger(limit), 'limit must be an integer');
        return this.$_addRule({
          name: 'precision',
          args: {
            limit
          }
        });
      },

      validate(value, helpers, {
        limit
      }) {
        const places = value.toString().match(internals.precisionRx);
        const decimals = Math.max((places[1] ? places[1].length : 0) - (places[2] ? parseInt(places[2], 10) : 0), 0);

        if (decimals <= limit) {
          return value;
        }

        return helpers.error('number.precision', {
          limit,
          value
        });
      },

      convert: true
    },
    sign: {
      method(sign) {
        Assert(['negative', 'positive'].includes(sign), 'Invalid sign', sign);
        return this.$_addRule({
          name: 'sign',
          args: {
            sign
          }
        });
      },

      validate(value, helpers, {
        sign
      }) {
        if (sign === 'negative' && value < 0 || sign === 'positive' && value > 0) {
          return value;
        }

        return helpers.error(`number.${sign}`);
      }

    },
    unsafe: {
      method(enabled = true) {
        Assert(typeof enabled === 'boolean', 'enabled must be a boolean');
        return this.$_setFlag('unsafe', enabled);
      }

    }
  },
  cast: {
    string: {
      from: value => typeof value === 'number',

      to(value, helpers) {
        return value.toString();
      }

    }
  },
  messages: {
    'number.base': '{{#label}} must be a number',
    'number.greater': '{{#label}} must be greater than {{#limit}}',
    'number.infinity': '{{#label}} cannot be infinity',
    'number.integer': '{{#label}} must be an integer',
    'number.less': '{{#label}} must be less than {{#limit}}',
    'number.max': '{{#label}} must be less than or equal to {{#limit}}',
    'number.min': '{{#label}} must be larger than or equal to {{#limit}}',
    'number.multiple': '{{#label}} must be a multiple of {{#multiple}}',
    'number.negative': '{{#label}} must be a negative number',
    'number.port': '{{#label}} must be a valid port',
    'number.positive': '{{#label}} must be a positive number',
    'number.precision': '{{#label}} must have no more than {{#limit}} decimal places',
    'number.unsafe': '{{#label}} must be a safe number'
  }
}); // Helpers

internals.normalizeExponent = function (str) {
  return str.replace(/E/, 'e').replace(/\.(\d*[1-9])?0+e/, '.$1e').replace(/\.e/, 'e').replace(/e\+/, 'e').replace(/^\+/, '').replace(/^(-?)0+([1-9])/, '$1$2');
};

internals.normalizeDecimal = function (str) {
  str = str.replace(/^\+/, '').replace(/\.0+$/, '').replace(/^(-?)\.([^\.]*)$/, '$10.$2').replace(/^(-?)0+([1-9])/, '$1$2');

  if (str.includes('.') && str.endsWith('0')) {
    str = str.replace(/0+$/, '');
  }

  if (str === '-0') {
    return '0';
  }

  return str;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/object.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Keys = __webpack_require__(/*! ./keys */ "./node_modules/@hapi/joi/lib/types/keys.js");

const internals = {};
module.exports = Keys.extend({
  type: 'object',
  cast: {
    map: {
      from: value => value && typeof value === 'object',

      to(value, helpers) {
        return new Map(Object.entries(value));
      }

    }
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/string.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/string.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Domain = __webpack_require__(/*! @hapi/address/lib/domain */ "./node_modules/@hapi/address/lib/domain.js");

const Email = __webpack_require__(/*! @hapi/address/lib/email */ "./node_modules/@hapi/address/lib/email.js");

const Ip = __webpack_require__(/*! @hapi/address/lib/ip */ "./node_modules/@hapi/address/lib/ip.js");

const EscapeRegex = __webpack_require__(/*! @hapi/hoek/lib/escapeRegex */ "./node_modules/@hapi/hoek/lib/escapeRegex.js");

const Tlds = __webpack_require__(/*! @hapi/address/lib/tlds */ "./node_modules/@hapi/address/lib/tlds.js");

const Uri = __webpack_require__(/*! @hapi/address/lib/uri */ "./node_modules/@hapi/address/lib/uri.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const Common = __webpack_require__(/*! ../common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {
  tlds: Tlds instanceof Set ? {
    tlds: {
      allow: Tlds,
      deny: null
    }
  } : false,
  // $lab:coverage:ignore$
  base64Regex: {
    // paddingRequired
    true: {
      // urlSafe
      true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/,
      false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
    },
    false: {
      true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/,
      false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/
    }
  },
  dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/,
  hexRegex: /^[a-f0-9]+$/i,
  ipRegex: Ip.regex().regex,
  isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,
  guidBrackets: {
    '{': '}',
    '[': ']',
    '(': ')',
    '': ''
  },
  guidVersions: {
    uuidv1: '1',
    uuidv2: '2',
    uuidv3: '3',
    uuidv4: '4',
    uuidv5: '5'
  },
  cidrPresences: ['required', 'optional', 'forbidden'],
  normalizationForms: ['NFC', 'NFD', 'NFKC', 'NFKD']
};
module.exports = Any.extend({
  type: 'string',
  flags: {
    insensitive: {
      default: false
    },
    truncate: {
      default: false
    }
  },
  terms: {
    replacements: {
      init: null
    }
  },
  coerce: {
    from: 'string',

    method(value, {
      schema,
      state,
      prefs
    }) {
      const normalize = schema.$_getRule('normalize');

      if (normalize) {
        value = value.normalize(normalize.args.form);
      }

      const casing = schema.$_getRule('case');

      if (casing) {
        value = casing.args.direction === 'upper' ? value.toLocaleUpperCase() : value.toLocaleLowerCase();
      }

      const trim = schema.$_getRule('trim');

      if (trim && trim.args.enabled) {
        value = value.trim();
      }

      if (schema.$_terms.replacements) {
        for (const replacement of schema.$_terms.replacements) {
          value = value.replace(replacement.pattern, replacement.replacement);
        }
      }

      const hex = schema.$_getRule('hex');

      if (hex && hex.args.options.byteAligned && value.length % 2 !== 0) {
        value = `0${value}`;
      }

      if (schema.$_getRule('isoDate')) {
        const iso = internals.isoDate(value);

        if (iso) {
          value = iso;
        }
      }

      if (schema._flags.truncate) {
        const rule = schema.$_getRule('max');

        if (rule) {
          let limit = rule.args.limit;

          if (Common.isResolvable(limit)) {
            limit = limit.resolve(value, state, prefs);

            if (!Common.limit(limit)) {
              return {
                value,
                errors: schema.$_createError('any.ref', limit, {
                  ref: rule.args.limit,
                  arg: 'limit',
                  reason: 'must be a positive integer'
                }, state, prefs)
              };
            }
          }

          value = value.slice(0, limit);
        }
      }

      return {
        value
      };
    }

  },

  validate(value, {
    error
  }) {
    if (typeof value !== 'string') {
      return {
        value,
        errors: error('string.base')
      };
    }

    if (value === '') {
      return {
        value,
        errors: error('string.empty')
      };
    }
  },

  rules: {
    alphanum: {
      method() {
        return this.$_addRule('alphanum');
      },

      validate(value, helpers) {
        if (/^[a-zA-Z0-9]+$/.test(value)) {
          return value;
        }

        return helpers.error('string.alphanum');
      }

    },
    base64: {
      method(options = {}) {
        Common.assertOptions(options, ['paddingRequired', 'urlSafe']);
        options = {
          urlSafe: false,
          paddingRequired: true,
          ...options
        };
        Assert(typeof options.paddingRequired === 'boolean', 'paddingRequired must be boolean');
        Assert(typeof options.urlSafe === 'boolean', 'urlSafe must be boolean');
        return this.$_addRule({
          name: 'base64',
          args: {
            options
          }
        });
      },

      validate(value, helpers, {
        options
      }) {
        const regex = internals.base64Regex[options.paddingRequired][options.urlSafe];

        if (regex.test(value)) {
          return value;
        }

        return helpers.error('string.base64');
      }

    },
    case: {
      method(direction) {
        Assert(['lower', 'upper'].includes(direction), 'Invalid case:', direction);
        return this.$_addRule({
          name: 'case',
          args: {
            direction
          }
        });
      },

      validate(value, helpers, {
        direction
      }) {
        if (direction === 'lower' && value === value.toLocaleLowerCase() || direction === 'upper' && value === value.toLocaleUpperCase()) {
          return value;
        }

        return helpers.error(`string.${direction}case`);
      },

      convert: true
    },
    creditCard: {
      method() {
        return this.$_addRule('creditCard');
      },

      validate(value, helpers) {
        let i = value.length;
        let sum = 0;
        let mul = 1;

        while (i--) {
          const char = value.charAt(i) * mul;
          sum = sum + (char - (char > 9) * 9);
          mul = mul ^ 3;
        }

        if (sum > 0 && sum % 10 === 0) {
          return value;
        }

        return helpers.error('string.creditCard');
      }

    },
    dataUri: {
      method(options = {}) {
        Common.assertOptions(options, ['paddingRequired']);
        options = {
          paddingRequired: true,
          ...options
        };
        Assert(typeof options.paddingRequired === 'boolean', 'paddingRequired must be boolean');
        return this.$_addRule({
          name: 'dataUri',
          args: {
            options
          }
        });
      },

      validate(value, helpers, {
        options
      }) {
        const matches = value.match(internals.dataUriRegex);

        if (matches) {
          if (!matches[2]) {
            return value;
          }

          if (matches[2] !== 'base64') {
            return value;
          }

          const base64regex = internals.base64Regex[options.paddingRequired].false;

          if (base64regex.test(matches[3])) {
            return value;
          }
        }

        return helpers.error('string.dataUri');
      }

    },
    domain: {
      method(options) {
        if (options) {
          Common.assertOptions(options, ['allowUnicode', 'minDomainSegments', 'tlds']);
        }

        const address = internals.addressOptions(options);
        return this.$_addRule({
          name: 'domain',
          args: {
            options
          },
          address
        });
      },

      validate(value, helpers, args, {
        address
      }) {
        if (Domain.isValid(value, address)) {
          return value;
        }

        return helpers.error('string.domain');
      }

    },
    email: {
      method(options = {}) {
        Common.assertOptions(options, ['allowUnicode', 'ignoreLength', 'minDomainSegments', 'multiple', 'separator', 'tlds']);
        Assert(options.multiple === undefined || typeof options.multiple === 'boolean', 'multiple option must be an boolean');
        const address = internals.addressOptions(options);
        const regex = new RegExp(`\\s*[${options.separator ? EscapeRegex(options.separator) : ','}]\\s*`);
        return this.$_addRule({
          name: 'email',
          args: {
            options
          },
          regex,
          address
        });
      },

      validate(value, helpers, {
        options
      }, {
        regex,
        address
      }) {
        const emails = options.multiple ? value.split(regex) : [value];
        const invalids = [];

        for (const email of emails) {
          if (!Email.isValid(email, address)) {
            invalids.push(email);
          }
        }

        if (!invalids.length) {
          return value;
        }

        return helpers.error('string.email', {
          value,
          invalids
        });
      }

    },
    guid: {
      alias: 'uuid',

      method(options = {}) {
        Common.assertOptions(options, ['version']);
        let versionNumbers = '';

        if (options.version) {
          const versions = [].concat(options.version);
          Assert(versions.length >= 1, 'version must have at least 1 valid version specified');
          const set = new Set();

          for (let i = 0; i < versions.length; ++i) {
            const version = versions[i];
            Assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
            const versionNumber = internals.guidVersions[version.toLowerCase()];
            Assert(versionNumber, 'version at position ' + i + ' must be one of ' + Object.keys(internals.guidVersions).join(', '));
            Assert(!set.has(versionNumber), 'version at position ' + i + ' must not be a duplicate');
            versionNumbers += versionNumber;
            set.add(versionNumber);
          }
        }

        const regex = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[${versionNumbers || '0-9A-F'}][0-9A-F]{3}\\2?[${versionNumbers ? '89AB' : '0-9A-F'}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, 'i');
        return this.$_addRule({
          name: 'guid',
          args: {
            options
          },
          regex
        });
      },

      validate(value, helpers, args, {
        regex
      }) {
        const results = regex.exec(value);

        if (!results) {
          return helpers.error('string.guid');
        } // Matching braces


        if (internals.guidBrackets[results[1]] !== results[results.length - 1]) {
          return helpers.error('string.guid');
        }

        return value;
      }

    },
    hex: {
      method(options = {}) {
        Common.assertOptions(options, ['byteAligned']);
        options = {
          byteAligned: false,
          ...options
        };
        Assert(typeof options.byteAligned === 'boolean', 'byteAligned must be boolean');
        return this.$_addRule({
          name: 'hex',
          args: {
            options
          }
        });
      },

      validate(value, helpers, {
        options
      }) {
        if (!internals.hexRegex.test(value)) {
          return helpers.error('string.hex');
        }

        if (options.byteAligned && value.length % 2 !== 0) {
          return helpers.error('string.hexAlign');
        }

        return value;
      }

    },
    hostname: {
      method() {
        return this.$_addRule('hostname');
      },

      validate(value, helpers) {
        if (Domain.isValid(value, {
          minDomainSegments: 1
        }) || internals.ipRegex.test(value)) {
          return value;
        }

        return helpers.error('string.hostname');
      }

    },
    insensitive: {
      method() {
        return this.$_setFlag('insensitive', true);
      }

    },
    ip: {
      method(options = {}) {
        Common.assertOptions(options, ['cidr', 'version']);
        const {
          cidr,
          versions,
          regex
        } = Ip.regex(options);
        const version = options.version ? versions : undefined;
        return this.$_addRule({
          name: 'ip',
          args: {
            options: {
              cidr,
              version
            }
          },
          regex
        });
      },

      validate(value, helpers, {
        options
      }, {
        regex
      }) {
        if (regex.test(value)) {
          return value;
        }

        if (options.version) {
          return helpers.error('string.ipVersion', {
            value,
            cidr: options.cidr,
            version: options.version
          });
        }

        return helpers.error('string.ip', {
          value,
          cidr: options.cidr
        });
      }

    },
    isoDate: {
      method() {
        return this.$_addRule('isoDate');
      },

      validate(value, {
        error
      }) {
        if (internals.isoDate(value)) {
          return value;
        }

        return error('string.isoDate');
      }

    },
    isoDuration: {
      method() {
        return this.$_addRule('isoDuration');
      },

      validate(value, helpers) {
        if (internals.isoDurationRegex.test(value)) {
          return value;
        }

        return helpers.error('string.isoDuration');
      }

    },
    length: {
      method(limit, encoding) {
        return internals.length(this, 'length', limit, '=', encoding);
      },

      validate(value, helpers, {
        limit,
        encoding
      }, {
        name,
        operator,
        args
      }) {
        const length = encoding ? Buffer && Buffer.byteLength(value, encoding) : value.length; // $lab:coverage:ignore$

        if (Common.compare(length, limit, operator)) {
          return value;
        }

        return helpers.error('string.' + name, {
          limit: args.limit,
          value,
          encoding
        });
      },

      args: [{
        name: 'limit',
        ref: true,
        assert: Common.limit,
        message: 'must be a positive integer'
      }, 'encoding']
    },
    lowercase: {
      method() {
        return this.case('lower');
      }

    },
    max: {
      method(limit, encoding) {
        return internals.length(this, 'max', limit, '<=', encoding);
      },

      args: ['limit', 'encoding']
    },
    min: {
      method(limit, encoding) {
        return internals.length(this, 'min', limit, '>=', encoding);
      },

      args: ['limit', 'encoding']
    },
    normalize: {
      method(form = 'NFC') {
        Assert(internals.normalizationForms.includes(form), 'normalization form must be one of ' + internals.normalizationForms.join(', '));
        return this.$_addRule({
          name: 'normalize',
          args: {
            form
          }
        });
      },

      validate(value, {
        error
      }, {
        form
      }) {
        if (value === value.normalize(form)) {
          return value;
        }

        return error('string.normalize', {
          value,
          form
        });
      },

      convert: true
    },
    pattern: {
      alias: 'regex',

      method(regex, options = {}) {
        Assert(regex instanceof RegExp, 'regex must be a RegExp');
        Assert(!regex.flags.includes('g') && !regex.flags.includes('y'), 'regex should not use global or sticky mode');

        if (typeof options === 'string') {
          options = {
            name: options
          };
        }

        Common.assertOptions(options, ['invert', 'name']);
        const errorCode = ['string.pattern', options.invert ? '.invert' : '', options.name ? '.name' : '.base'].join('');
        return this.$_addRule({
          name: 'pattern',
          args: {
            regex,
            options
          },
          errorCode
        });
      },

      validate(value, helpers, {
        regex,
        options
      }, {
        errorCode
      }) {
        const patternMatch = regex.test(value);

        if (patternMatch ^ options.invert) {
          return value;
        }

        return helpers.error(errorCode, {
          name: options.name,
          regex,
          value
        });
      },

      args: ['regex', 'options'],
      multi: true
    },
    replace: {
      method(pattern, replacement) {
        if (typeof pattern === 'string') {
          pattern = new RegExp(EscapeRegex(pattern), 'g');
        }

        Assert(pattern instanceof RegExp, 'pattern must be a RegExp');
        Assert(typeof replacement === 'string', 'replacement must be a String');
        const obj = this.clone();

        if (!obj.$_terms.replacements) {
          obj.$_terms.replacements = [];
        }

        obj.$_terms.replacements.push({
          pattern,
          replacement
        });
        return obj;
      }

    },
    token: {
      method() {
        return this.$_addRule('token');
      },

      validate(value, helpers) {
        if (/^\w+$/.test(value)) {
          return value;
        }

        return helpers.error('string.token');
      }

    },
    trim: {
      method(enabled = true) {
        Assert(typeof enabled === 'boolean', 'enabled must be a boolean');
        return this.$_addRule({
          name: 'trim',
          args: {
            enabled
          }
        });
      },

      validate(value, helpers, {
        enabled
      }) {
        if (!enabled || value === value.trim()) {
          return value;
        }

        return helpers.error('string.trim');
      },

      convert: true
    },
    truncate: {
      method(enabled = true) {
        Assert(typeof enabled === 'boolean', 'enabled must be a boolean');
        return this.$_setFlag('truncate', enabled);
      }

    },
    uppercase: {
      method() {
        return this.case('upper');
      }

    },
    uri: {
      method(options = {}) {
        Common.assertOptions(options, ['allowRelative', 'allowQuerySquareBrackets', 'domain', 'relativeOnly', 'scheme']);

        if (options.domain) {
          Common.assertOptions(options.domain, ['allowUnicode', 'minDomainSegments', 'tlds']);
        }

        const {
          regex,
          scheme
        } = Uri.regex(options);
        const domain = options.domain ? internals.addressOptions(options.domain) : null;
        return this.$_addRule({
          name: 'uri',
          args: {
            options
          },
          regex,
          domain,
          scheme
        });
      },

      validate(value, helpers, {
        options
      }, {
        regex,
        domain,
        scheme
      }) {
        if (['http:/', 'https:/'].includes(value)) {
          // scheme:/ is technically valid but makes no sense
          return helpers.error('string.uri');
        }

        const match = regex.exec(value);

        if (match) {
          if (domain) {
            const matched = match[1] || match[2];

            if (!Domain.isValid(matched, domain)) {
              return helpers.error('string.domain', {
                value: matched
              });
            }
          }

          return value;
        }

        if (options.relativeOnly) {
          return helpers.error('string.uriRelativeOnly');
        }

        if (options.scheme) {
          return helpers.error('string.uriCustomScheme', {
            scheme,
            value
          });
        }

        return helpers.error('string.uri');
      }

    }
  },
  manifest: {
    build(obj, desc) {
      if (desc.replacements) {
        for (const {
          pattern,
          replacement
        } of desc.replacements) {
          obj = obj.replace(pattern, replacement);
        }
      }

      return obj;
    }

  },
  messages: {
    'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
    'string.base': '{{#label}} must be a string',
    'string.base64': '{{#label}} must be a valid base64 string',
    'string.creditCard': '{{#label}} must be a credit card',
    'string.dataUri': '{{#label}} must be a valid dataUri string',
    'string.domain': '{{#label}} must contain a valid domain name',
    'string.email': '{{#label}} must be a valid email',
    'string.empty': '{{#label}} is not allowed to be empty',
    'string.guid': '{{#label}} must be a valid GUID',
    'string.hex': '{{#label}} must only contain hexadecimal characters',
    'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
    'string.hostname': '{{#label}} must be a valid hostname',
    'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
    'string.ipVersion': '{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
    'string.isoDate': '{{#label}} must be in iso format',
    'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
    'string.length': '{{#label}} length must be {{#limit}} characters long',
    'string.lowercase': '{{#label}} must only contain lowercase characters',
    'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
    'string.min': '{{#label}} length must be at least {{#limit}} characters long',
    'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
    'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
    'string.pattern.base': '{{#label}} with value "{[.]}" fails to match the required pattern: {{#regex}}',
    'string.pattern.name': '{{#label}} with value "{[.]}" fails to match the {{#name}} pattern',
    'string.pattern.invert.base': '{{#label}} with value "{[.]}" matches the inverted pattern: {{#regex}}',
    'string.pattern.invert.name': '{{#label}} with value "{[.]}" matches the inverted {{#name}} pattern',
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'string.uri': '{{#label}} must be a valid uri',
    'string.uriCustomScheme': '{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
    'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
    'string.uppercase': '{{#label}} must only contain uppercase characters'
  }
}); // Helpers

internals.addressOptions = function (options) {
  if (!options) {
    return options;
  } // minDomainSegments


  Assert(options.minDomainSegments === undefined || Number.isSafeInteger(options.minDomainSegments) && options.minDomainSegments > 0, 'minDomainSegments must be a positive integer'); // tlds

  if (options.tlds === false) {
    return options;
  }

  if (options.tlds === true || options.tlds === undefined) {
    Assert(internals.tlds, 'Built-in TLD list disabled');
    return Object.assign({}, options, internals.tlds);
  }

  Assert(typeof options.tlds === 'object', 'tlds must be true, false, or an object');
  const deny = options.tlds.deny;

  if (deny) {
    if (Array.isArray(deny)) {
      options = Object.assign({}, options, {
        tlds: {
          deny: new Set(deny)
        }
      });
    }

    Assert(options.tlds.deny instanceof Set, 'tlds.deny must be an array, Set, or boolean');
    Assert(!options.tlds.allow, 'Cannot specify both tlds.allow and tlds.deny lists');
    return options;
  }

  const allow = options.tlds.allow;

  if (!allow) {
    return options;
  }

  if (allow === true) {
    Assert(internals.tlds, 'Built-in TLD list disabled');
    return Object.assign({}, options, internals.tlds);
  }

  if (Array.isArray(allow)) {
    options = Object.assign({}, options, {
      tlds: {
        allow: new Set(allow)
      }
    });
  }

  Assert(options.tlds.allow instanceof Set, 'tlds.allow must be an array, Set, or boolean');
  return options;
};

internals.isoDate = function (value) {
  if (!Common.isIsoDate(value)) {
    return null;
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

internals.length = function (schema, name, limit, operator, encoding) {
  Assert(!encoding || Buffer && Buffer.isEncoding(encoding), 'Invalid encoding:', encoding); // $lab:coverage:ignore$

  return schema.$_addRule({
    name,
    method: 'length',
    args: {
      limit,
      encoding
    },
    operator
  });
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/types/symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/types/symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Any = __webpack_require__(/*! ./any */ "./node_modules/@hapi/joi/lib/types/any.js");

const internals = {};
internals.Map = class extends Map {
  slice() {
    return new internals.Map(this);
  }

};
module.exports = Any.extend({
  type: 'symbol',
  terms: {
    map: {
      init: new internals.Map()
    }
  },
  coerce: {
    method(value, {
      schema,
      error
    }) {
      const lookup = schema.$_terms.map.get(value);

      if (lookup) {
        value = lookup;
      }

      if (!schema._flags.only || typeof value === 'symbol') {
        return {
          value
        };
      }

      return {
        value,
        errors: error('symbol.map', {
          map: schema.$_terms.map
        })
      };
    }

  },

  validate(value, {
    error
  }) {
    if (typeof value !== 'symbol') {
      return {
        value,
        errors: error('symbol.base')
      };
    }
  },

  rules: {
    map: {
      method(iterable) {
        if (iterable && !iterable[Symbol.iterator] && typeof iterable === 'object') {
          iterable = Object.entries(iterable);
        }

        Assert(iterable && iterable[Symbol.iterator], 'Iterable must be an iterable or object');
        const obj = this.clone();
        const symbols = [];

        for (const entry of iterable) {
          Assert(entry && entry[Symbol.iterator], 'Entry must be an iterable');
          const [key, value] = entry;
          Assert(typeof key !== 'object' && typeof key !== 'function' && typeof key !== 'symbol', 'Key must not be of type object, function, or Symbol');
          Assert(typeof value === 'symbol', 'Value must be a Symbol');
          obj.$_terms.map.set(key, value);
          symbols.push(value);
        }

        return obj.valid(...symbols);
      }

    }
  },
  manifest: {
    build(obj, desc) {
      if (desc.map) {
        obj = obj.map(desc.map);
      }

      return obj;
    }

  },
  messages: {
    'symbol.base': '{{#label}} must be a symbol',
    'symbol.map': '{{#label}} must be one of {{#map}}'
  }
});

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/validator.js":
/*!*************************************************!*\
  !*** ./node_modules/@hapi/joi/lib/validator.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const Clone = __webpack_require__(/*! @hapi/hoek/lib/clone */ "./node_modules/@hapi/hoek/lib/clone.js");

const Ignore = __webpack_require__(/*! @hapi/hoek/lib/ignore */ "./node_modules/@hapi/hoek/lib/ignore.js");

const Reach = __webpack_require__(/*! @hapi/hoek/lib/reach */ "./node_modules/@hapi/hoek/lib/reach.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const Errors = __webpack_require__(/*! ./errors */ "./node_modules/@hapi/joi/lib/errors.js");

const State = __webpack_require__(/*! ./state */ "./node_modules/@hapi/joi/lib/state.js");

const internals = {
  result: Symbol('result')
};

exports.entry = function (value, schema, prefs) {
  let settings = Common.defaults;

  if (prefs) {
    Assert(prefs.warnings === undefined, 'Cannot override warnings preference in synchronous validation');
    settings = Common.preferences(Common.defaults, prefs);
  }

  const result = internals.entry(value, schema, settings);
  Assert(!result.mainstay.externals.length, 'Schema with external rules must use validateAsync()');
  const outcome = {
    value: result.value
  };

  if (result.error) {
    outcome.error = result.error;
  }

  if (result.mainstay.warnings.length) {
    outcome.warning = Errors.details(result.mainstay.warnings);
  }

  if (result.mainstay.debug) {
    outcome.debug = result.mainstay.debug;
  }

  return outcome;
};

exports.entryAsync = async function (value, schema, prefs) {
  let settings = Common.defaults;

  if (prefs) {
    settings = Common.preferences(Common.defaults, prefs);
  }

  const result = internals.entry(value, schema, settings);
  const mainstay = result.mainstay;

  if (result.error) {
    if (mainstay.debug) {
      result.error.debug = mainstay.debug;
    }

    throw result.error;
  }

  if (mainstay.externals.length) {
    let root = result.value;

    for (const {
      method,
      path,
      label
    } of mainstay.externals) {
      let node = root;
      let key;
      let parent;

      if (path.length) {
        key = path[path.length - 1];
        parent = Reach(root, path.slice(0, -1));
        node = parent[key];
      }

      try {
        const output = await method(node);

        if (output === undefined || output === node) {
          continue;
        }

        if (parent) {
          parent[key] = output;
        } else {
          root = output;
        }
      } catch (err) {
        err.message += ` (${label})`; // Change message to include path

        throw err;
      }
    }

    result.value = root;
  }

  if (!settings.warnings && !settings.debug) {
    return result.value;
  }

  const outcome = {
    value: result.value
  };

  if (mainstay.warnings.length) {
    outcome.warning = Errors.details(mainstay.warnings);
  }

  if (mainstay.debug) {
    outcome.debug = mainstay.debug;
  }

  return outcome;
};

internals.entry = function (value, schema, prefs) {
  // Prepare state
  const {
    tracer,
    cleanup
  } = internals.tracer(schema, prefs);
  const debug = prefs.debug ? [] : null;
  const links = schema._ids._schemaChain ? new Map() : null;
  const mainstay = {
    externals: [],
    warnings: [],
    tracer,
    debug,
    links
  };
  const schemas = schema._ids._schemaChain ? [{
    schema
  }] : null;
  const state = new State([], [], {
    mainstay,
    schemas
  }); // Validate value

  const result = exports.validate(value, schema, state, prefs); // Process value and errors

  if (cleanup) {
    schema.$_root.untrace();
  }

  const error = Errors.process(result.errors, value, prefs);
  return {
    value: result.value,
    error,
    mainstay
  };
};

internals.tracer = function (schema, prefs) {
  if (schema.$_root._tracer) {
    return {
      tracer: schema.$_root._tracer._register(schema)
    };
  }

  if (prefs.debug) {
    Assert(schema.$_root.trace, 'Debug mode not supported');
    return {
      tracer: schema.$_root.trace()._register(schema),
      cleanup: true
    };
  }

  return {
    tracer: internals.ignore
  };
};

exports.validate = function (value, schema, state, prefs, overrides = {}) {
  if (schema.$_terms.whens) {
    schema = schema._generate(value, state, prefs).schema;
  } // Setup state and settings


  if (schema._preferences) {
    prefs = internals.prefs(schema, prefs);
  } // Cache


  if (schema._cache && prefs.cache) {
    const result = schema._cache.get(value);

    state.mainstay.tracer.debug(state, 'validate', 'cached', !!result);

    if (result) {
      return result;
    }
  } // Helpers


  const createError = (code, local, localState) => schema.$_createError(code, value, local, localState || state, prefs);

  const helpers = {
    original: value,
    prefs,
    schema,
    state,
    error: createError,
    warn: (code, local, localState) => state.mainstay.warnings.push(createError(code, local, localState)),
    message: (messages, local) => schema.$_createError('custom', value, local, state, prefs, {
      messages
    })
  }; // Prepare

  state.mainstay.tracer.entry(schema, state);
  const def = schema._definition;

  if (def.prepare && value !== undefined && prefs.convert) {
    const prepared = def.prepare(value, helpers);

    if (prepared) {
      state.mainstay.tracer.value(state, 'prepare', value, prepared.value);

      if (prepared.errors) {
        return internals.finalize(prepared.value, [].concat(prepared.errors), helpers); // Prepare error always aborts early
      }

      value = prepared.value;
    }
  } // Type coercion


  if (def.coerce && value !== undefined && prefs.convert && (!def.coerce.from || def.coerce.from.includes(typeof value))) {
    const coerced = def.coerce.method(value, helpers);

    if (coerced) {
      state.mainstay.tracer.value(state, 'coerced', value, coerced.value);

      if (coerced.errors) {
        return internals.finalize(coerced.value, [].concat(coerced.errors), helpers); // Coerce error always aborts early
      }

      value = coerced.value;
    }
  } // Empty value


  const empty = schema._flags.empty;

  if (empty && empty.$_match(internals.trim(value, schema), state.nest(empty), Common.defaults)) {
    state.mainstay.tracer.value(state, 'empty', value, undefined);
    value = undefined;
  } // Presence requirements (required, optional, forbidden)


  const presence = overrides.presence || schema._flags.presence || (schema._flags._endedSwitch ? 'ignore' : prefs.presence);

  if (value === undefined) {
    if (presence === 'forbidden') {
      return internals.finalize(value, null, helpers);
    }

    if (presence === 'required') {
      return internals.finalize(value, [schema.$_createError('any.required', value, null, state, prefs)], helpers);
    }

    if (presence === 'optional') {
      if (schema._flags.default !== Common.symbols.deepDefault) {
        return internals.finalize(value, null, helpers);
      }

      state.mainstay.tracer.value(state, 'default', value, {});
      value = {};
    }
  } else if (presence === 'forbidden') {
    return internals.finalize(value, [schema.$_createError('any.unknown', value, null, state, prefs)], helpers);
  } // Allowed values


  const errors = [];

  if (schema._valids) {
    const match = schema._valids.get(value, state, prefs, schema._flags.insensitive);

    if (match) {
      if (prefs.convert) {
        state.mainstay.tracer.value(state, 'valids', value, match.value);
        value = match.value;
      }

      state.mainstay.tracer.filter(schema, state, 'valid', match);
      return internals.finalize(value, null, helpers);
    }

    if (schema._flags.only) {
      const report = schema.$_createError('any.only', value, {
        valids: schema._valids.values({
          display: true
        })
      }, state, prefs);

      if (prefs.abortEarly) {
        return internals.finalize(value, [report], helpers);
      }

      errors.push(report);
    }
  } // Denied values


  if (schema._invalids) {
    const match = schema._invalids.get(value, state, prefs, schema._flags.insensitive);

    if (match) {
      state.mainstay.tracer.filter(schema, state, 'invalid', match);
      const report = schema.$_createError('any.invalid', value, {
        invalids: schema._invalids.values({
          display: true
        })
      }, state, prefs);

      if (prefs.abortEarly) {
        return internals.finalize(value, [report], helpers);
      }

      errors.push(report);
    }
  } // Base type


  if (def.validate) {
    const base = def.validate(value, helpers);

    if (base) {
      state.mainstay.tracer.value(state, 'base', value, base.value);
      value = base.value;

      if (base.errors) {
        if (!Array.isArray(base.errors)) {
          errors.push(base.errors);
          return internals.finalize(value, errors, helpers); // Base error always aborts early
        }

        if (base.errors.length) {
          errors.push(...base.errors);
          return internals.finalize(value, errors, helpers); // Base error always aborts early
        }
      }
    }
  } // Validate tests


  if (!schema._rules.length) {
    return internals.finalize(value, errors, helpers);
  }

  return internals.rules(value, errors, helpers);
};

internals.rules = function (value, errors, helpers) {
  const {
    schema,
    state,
    prefs
  } = helpers;

  for (const rule of schema._rules) {
    const definition = schema._definition.rules[rule.method]; // Skip rules that are also applied in coerce step

    if (definition.convert && prefs.convert) {
      state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'full');
      continue;
    } // Resolve references


    let ret;
    let args = rule.args;

    if (rule._resolve.length) {
      args = Object.assign({}, args); // Shallow copy

      for (const key of rule._resolve) {
        const resolver = definition.argsByName.get(key);
        const resolved = args[key].resolve(value, state, prefs);
        const normalized = resolver.normalize ? resolver.normalize(resolved) : resolved;
        const invalid = Common.validateArg(normalized, null, resolver);

        if (invalid) {
          ret = schema.$_createError('any.ref', resolved, {
            arg: key,
            ref: args[key],
            reason: invalid
          }, state, prefs);
          break;
        }

        args[key] = normalized;
      }
    } // Test rule


    ret = ret || definition.validate(value, helpers, args, rule); // Use ret if already set to reference error

    const result = internals.rule(ret, rule);

    if (result.errors) {
      state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'error');

      if (rule.warn) {
        state.mainstay.warnings.push(...result.errors);
        continue;
      }

      if (prefs.abortEarly) {
        return internals.finalize(value, result.errors, helpers);
      }

      errors.push(...result.errors);
    } else {
      state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'pass');
      state.mainstay.tracer.value(state, 'rule', value, result.value, rule.name);
      value = result.value;
    }
  }

  return internals.finalize(value, errors, helpers);
};

internals.rule = function (ret, rule) {
  if (ret instanceof Errors.Report) {
    internals.error(ret, rule);
    return {
      errors: [ret],
      value: null
    };
  }

  if (Array.isArray(ret) && (ret[0] instanceof Errors.Report || ret[0] instanceof Error)) {
    ret.forEach(report => internals.error(report, rule));
    return {
      errors: ret,
      value: null
    };
  }

  return {
    errors: null,
    value: ret
  };
};

internals.error = function (report, rule) {
  if (rule.message) {
    report._setTemplate(rule.message);
  }

  return report;
};

internals.finalize = function (value, errors, helpers) {
  errors = errors || [];
  const {
    schema,
    state,
    prefs
  } = helpers; // Failover value

  if (errors.length) {
    const failover = internals.default('failover', undefined, errors, helpers);

    if (failover !== undefined) {
      state.mainstay.tracer.value(state, 'failover', value, failover);
      value = failover;
      errors = [];
    }
  } // Error override


  if (errors.length && schema._flags.error) {
    if (typeof schema._flags.error === 'function') {
      errors = schema._flags.error(errors);

      if (!Array.isArray(errors)) {
        errors = [errors];
      }

      for (const error of errors) {
        Assert(error instanceof Error || error instanceof Errors.Report, 'error() must return an Error object');
      }
    } else {
      errors = [schema._flags.error];
    }
  } // Default


  if (value === undefined) {
    const defaulted = internals.default('default', value, errors, helpers);
    state.mainstay.tracer.value(state, 'default', value, defaulted);
    value = defaulted;
  } // Cast


  if (schema._flags.cast && value !== undefined) {
    const caster = schema._definition.cast[schema._flags.cast];

    if (caster.from(value)) {
      const casted = caster.to(value, helpers);
      state.mainstay.tracer.value(state, 'cast', value, casted, schema._flags.cast);
      value = casted;
    }
  } // Externals


  if (schema.$_terms.externals && prefs.externals && prefs._externals !== false) {
    // Disabled for matching
    for (const {
      method
    } of schema.$_terms.externals) {
      state.mainstay.externals.push({
        method,
        path: state.path,
        label: Errors.label(schema._flags, state, prefs)
      });
    }
  } // Result


  const result = {
    value,
    errors: errors.length ? errors : null
  };

  if (schema._flags.result) {
    result.value = schema._flags.result === 'strip' ? undefined :
    /* raw */
    helpers.original;
    state.mainstay.tracer.value(state, schema._flags.result, value, result.value);
    state.shadow(value, schema._flags.result);
  } // Cache


  if (schema._cache && prefs.cache !== false && !schema._refs.length) {
    schema._cache.set(helpers.original, result);
  }

  return result;
};

internals.prefs = function (schema, prefs) {
  const isDefaultOptions = prefs === Common.defaults;

  if (isDefaultOptions && schema._preferences[Common.symbols.prefs]) {
    return schema._preferences[Common.symbols.prefs];
  }

  prefs = Common.preferences(prefs, schema._preferences);

  if (isDefaultOptions) {
    schema._preferences[Common.symbols.prefs] = prefs;
  }

  return prefs;
};

internals.default = function (flag, value, errors, helpers) {
  const {
    schema,
    state,
    prefs
  } = helpers;
  const source = schema._flags[flag];

  if (prefs.noDefaults || source === undefined) {
    return value;
  }

  state.mainstay.tracer.log(schema, state, 'rule', flag, 'full');

  if (!source) {
    return source;
  }

  if (typeof source === 'function') {
    const args = source.length ? [Clone(state.ancestors[0]), helpers] : [];

    try {
      return source(...args);
    } catch (err) {
      errors.push(schema.$_createError(`any.${flag}`, null, {
        error: err
      }, state, prefs));
      return;
    }
  }

  if (typeof source !== 'object') {
    return source;
  }

  if (source[Common.symbols.literal]) {
    return source.literal;
  }

  if (Common.isResolvable(source)) {
    return source.resolve(value, state, prefs);
  }

  return Clone(source);
};

internals.trim = function (value, schema) {
  if (typeof value !== 'string') {
    return value;
  }

  const trim = schema.$_getRule('trim');

  if (!trim || !trim.args.enabled) {
    return value;
  }

  return value.trim();
};

internals.ignore = {
  active: false,
  debug: Ignore,
  entry: Ignore,
  filter: Ignore,
  log: Ignore,
  resolve: Ignore,
  value: Ignore
};

/***/ }),

/***/ "./node_modules/@hapi/joi/lib/values.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/joi/lib/values.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const DeepEqual = __webpack_require__(/*! @hapi/hoek/lib/deepEqual */ "./node_modules/@hapi/hoek/lib/deepEqual.js");

const Common = __webpack_require__(/*! ./common */ "./node_modules/@hapi/joi/lib/common.js");

const internals = {};
module.exports = internals.Values = class {
  constructor(values, refs) {
    this._values = new Set(values);
    this._refs = new Set(refs);
    this._lowercase = internals.lowercases(values);
    this._override = false;
  }

  get length() {
    return this._values.size + this._refs.size;
  }

  add(value, refs) {
    // Reference
    if (Common.isResolvable(value)) {
      if (!this._refs.has(value)) {
        this._refs.add(value);

        if (refs) {
          // Skipped in a merge
          refs.register(value);
        }
      }

      return;
    } // Value


    if (!this.has(value, null, null, false)) {
      this._values.add(value);

      if (typeof value === 'string') {
        this._lowercase.set(value.toLowerCase(), value);
      }
    }
  }

  static merge(target, source, remove) {
    target = target || new internals.Values();

    if (source) {
      if (source._override) {
        return source.clone();
      }

      for (const item of [...source._values, ...source._refs]) {
        target.add(item);
      }
    }

    if (remove) {
      for (const item of [...remove._values, ...remove._refs]) {
        target.remove(item);
      }
    }

    return target.length ? target : null;
  }

  remove(value) {
    // Reference
    if (Common.isResolvable(value)) {
      this._refs.delete(value);

      return;
    } // Value


    this._values.delete(value);

    if (typeof value === 'string') {
      this._lowercase.delete(value.toLowerCase());
    }
  }

  has(value, state, prefs, insensitive) {
    return !!this.get(value, state, prefs, insensitive);
  }

  get(value, state, prefs, insensitive) {
    if (!this.length) {
      return false;
    } // Simple match


    if (this._values.has(value)) {
      return {
        value
      };
    } // Case insensitive string match


    if (typeof value === 'string' && value && insensitive) {
      const found = this._lowercase.get(value.toLowerCase());

      if (found) {
        return {
          value: found
        };
      }
    }

    if (!this._refs.size && typeof value !== 'object') {
      return false;
    } // Objects


    if (typeof value === 'object') {
      for (const item of this._values) {
        if (DeepEqual(item, value)) {
          return {
            value: item
          };
        }
      }
    } // References


    if (state) {
      for (const ref of this._refs) {
        const resolved = ref.resolve(value, state, prefs, null, {
          in: true
        });

        if (resolved === undefined) {
          continue;
        }

        const items = !ref.in || typeof resolved !== 'object' ? [resolved] : Array.isArray(resolved) ? resolved : Object.keys(resolved);

        for (const item of items) {
          if (typeof item !== typeof value) {
            continue;
          }

          if (insensitive && value && typeof value === 'string') {
            if (item.toLowerCase() === value.toLowerCase()) {
              return {
                value: item,
                ref
              };
            }
          } else {
            if (DeepEqual(item, value)) {
              return {
                value: item,
                ref
              };
            }
          }
        }
      }
    }

    return false;
  }

  override() {
    this._override = true;
  }

  values(options) {
    if (options && options.display) {
      const values = [];

      for (const item of [...this._values, ...this._refs]) {
        if (item !== undefined) {
          values.push(item);
        }
      }

      return values;
    }

    return Array.from([...this._values, ...this._refs]);
  }

  clone() {
    const set = new internals.Values(this._values, this._refs);
    set._override = this._override;
    return set;
  }

  concat(source) {
    Assert(!source._override, 'Cannot concat override set of values');
    const set = new internals.Values([...this._values, ...source._values], [...this._refs, ...source._refs]);
    set._override = this._override;
    return set;
  }

  describe() {
    const normalized = [];

    if (this._override) {
      normalized.push({
        override: true
      });
    }

    for (const value of this._values.values()) {
      normalized.push(value && typeof value === 'object' ? {
        value
      } : value);
    }

    for (const value of this._refs.values()) {
      normalized.push(value.describe());
    }

    return normalized;
  }

};
internals.Values.prototype[Common.symbols.values] = true; // Aliases

internals.Values.prototype.slice = internals.Values.prototype.clone; // Helpers

internals.lowercases = function (from) {
  const map = new Map();

  if (from) {
    for (const value of from) {
      if (typeof value === 'string') {
        map.set(value.toLowerCase(), value);
      }
    }
  }

  return map;
};

/***/ }),

/***/ "./node_modules/@hapi/joi/package.json":
/*!*********************************************!*\
  !*** ./node_modules/@hapi/joi/package.json ***!
  \*********************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, browser, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, files, homepage, keywords, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"@hapi/joi\",\"_id\":\"@hapi/joi@17.1.1\",\"_inBundle\":false,\"_integrity\":\"sha512-p4DKeZAoeZW4g3u7ZeRo+vCDuSDgSvtsB/NpfjXEHTUjSeINAi/RrVOWiVQ1isaoLzMvFEhe8n5065mQq1AdQg==\",\"_location\":\"/@hapi/joi\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"@hapi/joi\",\"name\":\"@hapi/joi\",\"escapedName\":\"@hapi%2fjoi\",\"scope\":\"@hapi\",\"rawSpec\":\"\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/@hapi/joi/-/joi-17.1.1.tgz\",\"_shasum\":\"9cc8d7e2c2213d1e46708c6260184b447c661350\",\"_spec\":\"@hapi/joi\",\"_where\":\"/Users/chrissnoek/Documents/#NPM PROJECTS/spotshareWebsite/ui\",\"browser\":\"dist/joi-browser.min.js\",\"bugs\":{\"url\":\"https://github.com/hapijs/joi/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"@hapi/address\":\"^4.0.1\",\"@hapi/formula\":\"^2.0.0\",\"@hapi/hoek\":\"^9.0.0\",\"@hapi/pinpoint\":\"^2.0.0\",\"@hapi/topo\":\"^5.0.0\"},\"deprecated\":false,\"description\":\"Object schema validation\",\"devDependencies\":{\"@hapi/bourne\":\"2.x.x\",\"@hapi/code\":\"8.x.x\",\"@hapi/joi-legacy-test\":\"npm:@hapi/joi@15.x.x\",\"@hapi/lab\":\"22.x.x\"},\"files\":[\"lib/**/*\",\"dist/*\"],\"homepage\":\"https://github.com/hapijs/joi#readme\",\"keywords\":[\"schema\",\"validation\"],\"license\":\"BSD-3-Clause\",\"main\":\"lib/index.js\",\"name\":\"@hapi/joi\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/hapijs/joi.git\"},\"scripts\":{\"prepublishOnly\":\"cd browser && npm install && npm run build\",\"test\":\"lab -t 100 -a @hapi/code -L\",\"test-cov-html\":\"lab -r html -o coverage.html -a @hapi/code\"},\"version\":\"17.1.1\"}");

/***/ }),

/***/ "./node_modules/@hapi/pinpoint/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@hapi/pinpoint/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const internals = {};

exports.location = function (depth = 0) {
  const orig = Error.prepareStackTrace;

  Error.prepareStackTrace = (ignore, stack) => stack;

  const capture = {};
  Error.captureStackTrace(capture, this);
  const line = capture.stack[depth + 1];
  Error.prepareStackTrace = orig;
  return {
    filename: line.getFileName(),
    line: line.getLineNumber()
  };
};

/***/ }),

/***/ "./node_modules/@hapi/topo/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@hapi/topo/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Assert = __webpack_require__(/*! @hapi/hoek/lib/assert */ "./node_modules/@hapi/hoek/lib/assert.js");

const internals = {};
exports.Sorter = class {
  constructor() {
    this._items = [];
    this.nodes = [];
  }

  add(nodes, options) {
    options = options || {}; // Validate rules

    const before = [].concat(options.before || []);
    const after = [].concat(options.after || []);
    const group = options.group || '?';
    const sort = options.sort || 0; // Used for merging only

    Assert(!before.includes(group), `Item cannot come before itself: ${group}`);
    Assert(!before.includes('?'), 'Item cannot come before unassociated items');
    Assert(!after.includes(group), `Item cannot come after itself: ${group}`);
    Assert(!after.includes('?'), 'Item cannot come after unassociated items');

    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    for (const node of nodes) {
      const item = {
        seq: this._items.length,
        sort,
        before,
        after,
        group,
        node
      };

      this._items.push(item);
    } // Insert event


    const valid = this._sort();

    Assert(valid, 'item', group !== '?' ? `added into group ${group}` : '', 'created a dependencies error');
    return this.nodes;
  }

  merge(others) {
    if (!Array.isArray(others)) {
      others = [others];
    }

    for (const other of others) {
      if (other) {
        for (const item of other._items) {
          this._items.push(Object.assign({}, item)); // Shallow cloned

        }
      }
    } // Sort items


    this._items.sort(internals.mergeSort);

    for (let i = 0; i < this._items.length; ++i) {
      this._items[i].seq = i;
    }

    const valid = this._sort();

    Assert(valid, 'merge created a dependencies error');
    return this.nodes;
  }

  _sort() {
    // Construct graph
    const graph = {};
    const graphAfters = Object.create(null); // A prototype can bungle lookups w/ false positives

    const groups = Object.create(null);

    for (const item of this._items) {
      const seq = item.seq; // Unique across all items

      const group = item.group; // Determine Groups

      groups[group] = groups[group] || [];
      groups[group].push(seq); // Build intermediary graph using 'before'

      graph[seq] = item.before; // Build second intermediary graph with 'after'

      for (const after of item.after) {
        graphAfters[after] = graphAfters[after] || [];
        graphAfters[after].push(seq);
      }
    } // Expand intermediary graph


    for (const node in graph) {
      const expandedGroups = [];

      for (const graphNodeItem in graph[node]) {
        const group = graph[node][graphNodeItem];
        groups[group] = groups[group] || [];
        expandedGroups.push(...groups[group]);
      }

      graph[node] = expandedGroups;
    } // Merge intermediary graph using graphAfters into final graph


    for (const group in graphAfters) {
      if (groups[group]) {
        for (const node of groups[group]) {
          graph[node].push(...graphAfters[group]);
        }
      }
    } // Compile ancestors


    const ancestors = {};

    for (const node in graph) {
      const children = graph[node];

      for (const child of children) {
        ancestors[child] = ancestors[child] || [];
        ancestors[child].push(node);
      }
    } // Topo sort


    const visited = {};
    const sorted = [];

    for (let i = 0; i < this._items.length; ++i) {
      // Looping through item.seq values out of order
      let next = i;

      if (ancestors[i]) {
        next = null;

        for (let j = 0; j < this._items.length; ++j) {
          // As above, these are item.seq values
          if (visited[j] === true) {
            continue;
          }

          if (!ancestors[j]) {
            ancestors[j] = [];
          }

          const shouldSeeCount = ancestors[j].length;
          let seenCount = 0;

          for (let k = 0; k < shouldSeeCount; ++k) {
            if (visited[ancestors[j][k]]) {
              ++seenCount;
            }
          }

          if (seenCount === shouldSeeCount) {
            next = j;
            break;
          }
        }
      }

      if (next !== null) {
        visited[next] = true;
        sorted.push(next);
      }
    }

    if (sorted.length !== this._items.length) {
      return false;
    }

    const seqIndex = {};

    for (const item of this._items) {
      seqIndex[item.seq] = item;
    }

    this._items = [];
    this.nodes = [];

    for (const value of sorted) {
      const sortedItem = seqIndex[value];
      this.nodes.push(sortedItem.node);

      this._items.push(sortedItem);
    }

    return true;
  }

};

internals.mergeSort = (a, b) => {
  return a.sort === b.sort ? 0 : a.sort < b.sort ? -1 : 1;
};

/***/ }),

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

/***/ "./src/AddPhoto.jsx":
/*!**************************!*\
  !*** ./src/AddPhoto.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/ai */ "react-icons/ai");
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_ai__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_2__);




function AddPhoto(props) {
  if (props.currentStep && props.currentStep !== 1) {
    return null;
  }

  const {
    date,
    shutterspeed,
    iso,
    aperture,
    camera,
    focalLength,
    title
  } = props.state.photo;
  const {
    photoLoading,
    tempFile
  } = props.state;
  let showInputClass = "relative border-2 border-dashed rounded mb-2 p-4 text-center cursor-pointer hover:border-green-500";
  showInputClass += !tempFile && !photoLoading ? ' block' : ' hidden';
  showInputClass += props.state.onDragOver && !props.state.invalidFields.blob ? " border-green-400" : " border-gray-400";
  if (props.state.invalidFields.blob) showInputClass += " border-red-400";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "fileInput",
    className: showInputClass
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "file",
    name: "blob",
    ref: props.fileInput,
    onChange: props.onFileChange,
    onDrop: props.handleOnDrop,
    onDragOver: props.handleOnDragOver,
    onDragLeave: props.handleOnDragLeave,
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
  }, props.state.invalidFields.blob), photoLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_1__["AiOutlineLoading3Quarters"], {
    className: "fill-current text-green-500"
  }), tempFile && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "imagePreview",
    className: "relative relative bg-gray-300 p-4 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: props.removeImage,
    className: "border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_2__["FiTrash2"], {
    className: "stroke-current text-gray-100"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: tempFile,
    id: "output_image",
    className: "max-w-full rounded mb-2"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "title",
    placeholder: "Titel",
    value: title || "",
    onChange: props.onChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-red-500"
  }, props.state.invalidFields.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "date",
    name: "date",
    placeholder: "Datum",
    value: date || "",
    onChange: props.onChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap items-stretch w-full relative mb-2 mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "shutterspeed",
    placeholder: "Sluitertijd",
    value: shutterspeed || "",
    onChange: props.onChange,
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
    type: "number",
    name: "iso",
    placeholder: "iso",
    value: iso || "",
    onChange: props.onChange,
    className: "mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap items-stretch w-full relative mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex -mr-px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
  }, "f/")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "aperture",
    placeholder: "Diafragma",
    onChange: props.onChange,
    value: aperture || "",
    className: "mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "camera",
    placeholder: "camera",
    onChange: props.onChange,
    value: camera || ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "focalLength",
    value: focalLength || "",
    onChange: props.onChange,
    placeholder: "focalLength"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    type: "text",
    name: "desc",
    onChange: props.onChange,
    placeholder: "Beschrijving"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (AddPhoto);

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

/***/ "./src/Form.jsx":
/*!**********************!*\
  !*** ./src/Form.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "./node_modules/@hapi/joi/lib/index.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Form extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {},
      errors: {}
    });

    _defineProperty(this, "handleChange", ({
      currentTarget: input
    }) => {
      const errors = { ...this.state.errors
      };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;else delete errors[input.name];
      const data = { ...this.state.data
      };
      data[input.name] = input.value;
      this.setState({
        data,
        errors
      });
    });

    _defineProperty(this, "validate", () => {
      const options = {
        abortEarly: false
      };
      const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...this.schema
      });
      const {
        error
      } = schema.validate(this.state.data, options);
      if (!error) return null;
      const errors = {};

      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }

      return errors;
    });

    _defineProperty(this, "validateProperty", ({
      name,
      value
    }) => {
      const object = {
        [name]: value
      };
      const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
        [name]: this.schema[name]
      });
      const result = schema.validate(object);
      console.log(result);
      const error = result.error;
      console.log('returning', error);
      return error ? error.details[0].message : null;
    });

    _defineProperty(this, "handleSubmit", e => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({
        errors: errors || {}
      });
      if (errors) return;
      this.doSubmit();
    });
  }

  renderButton(label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "text-white font-bold py-2 px-4 rounded" + (this.validate() ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: this.validate()
    }, label);
  }

  renderInput(name, label, placeholder, type = 'text', classes = 'w-full') {
    const {
      data,
      errors
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name],
      onChange: this.handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./src/Input.jsx":
/*!***********************!*\
  !*** ./src/Input.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



const Input = ({
  classes,
  name,
  label,
  error,
  ...rest
}) => {
  const className = "mb-2 " + classes;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "block text-grey-darker text-sm font-bold mb-2",
    htmlFor: name
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
    autoFocus: true,
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
    id: name,
    name: name
  }, rest)), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-red-500"
  }, error));
};

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/LocationCard.jsx":
/*!******************************!*\
  !*** ./src/LocationCard.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class LocationCard extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClickHandler", () => {
      this.props.onClick(this.props.location);
    });

    this.state = {
      active: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeLocation !== this.props.activeLocation) {
      const active = this.props.location === this.props.activeLocation ? true : false;
      this.setState({
        active
      });
    }
  }

  render() {
    const {
      active
    } = this.state;
    let className = "locationCard relative shadow-xs border-4 overflow-hidden hover:border-green-500";
    className += active ? ' border-green-500' : '';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full inline-block md:w-1/2 lg:w-1/3 m-2 rounded relative",
      onClick: this.onClickHandler
    }, active && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "absolute top-0 right-0 transform z-10 p-1 translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 text-white"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaCheck"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: className
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "relative overflow-hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: this.props.location.photos[0].photo[0].url,
      className: "object-cover  w-full h-48  block",
      alt: "Foto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "photoContent p-4 absolute bottom-0 left-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "photoInfo"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "text-white"
    }, this.props.location.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "clear"
    }))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (LocationCard);

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
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* globals React */

/* eslint "react/jsx-no-undef":"off" */










class LocationDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query locationBySlug($slug: String!){
            locationBySlug(slug: $slug) {
                title
                photos {
                    likes
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
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
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
    const position = [locationBySlug.latitude, locationBySlug.longitude];
    const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
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

/***/ "./src/Login.jsx":
/*!***********************!*\
  !*** ./src/Login.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "./node_modules/@hapi/joi/lib/index.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Form_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form.jsx */ "./src/Form.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class LoginForm extends _Form_jsx__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    });

    _defineProperty(this, "schema", {
      email: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email({
        tlds: {
          allow: false
        }
      }).required().messages({
        "string.empty": `Vul je je email nog even in? 😉.`,
        "any.required": `Vul je je email nog even in? 😉.`,
        "string.email": `Vul je een geldig adres in? 😉.`
      }),
      password: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
        "any.required": `Vul je je wachtwoord nog even in? 😉.`
      })
    });

    _defineProperty(this, "loginUser", async () => {
      const query = `mutation login($input: UsersPermissionsLoginInput!) {
            login(input: $input) {
              jwt
              user {
                id
                email
                username
              }
            }
          } `;
      const {
        data
      } = this.state;
      let input = { ...data
      };
      Object.defineProperty(input, "identifier", Object.getOwnPropertyDescriptor(input, "email"));
      delete input["email"];
      console.log(input);
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
        input
      }, true, true);

      if (result) {
        if (result.errors) {
          const error = result.errors[0]; // Error, email or password wrong

          console.log(error);
        } else {
          // user logged in!
          const {
            login
          } = result;
          const {
            jwt,
            user: {
              email,
              id,
              username
            }
          } = login;
          console.log(jwt, id, email, username);
          localStorage.setItem('token', jwt);
          this.props.history.push('/');
        }
      }
    });

    _defineProperty(this, "doSubmit", () => {
      // call server
      // redirect user to homepage
      console.log('submitted');
      this.loginUser();
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "m-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.handleSubmit,
      className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl text-green-500"
    }, "Inloggen bij Spotshare"), this.renderInput('email', 'Email', 'Emailadres'), this.renderInput('password', 'Wachtwoord', 'Vul je wachtwoord in', 'password'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center justify-between"
    }, this.renderButton('Log in'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600",
      href: "#"
    }, "Wachtwoord vergeten?"), " |", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
      className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600",
      to: "/aanmelden"
    }, "Aanmelden")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (LoginForm);

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
      to: "/aanmelden",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "Aanmelden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      onClick: this.closeMenu,
      to: "/inloggen",
      className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
    }, "Inloggen")));
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
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DateInput_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DateInput.jsx */ "./src/DateInput.jsx");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! exifr */ "exifr");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(exifr__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* harmony import */ var _LocationCard_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LocationCard.jsx */ "./src/LocationCard.jsx");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-select/creatable */ "react-select/creatable");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_select_creatable__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-select */ "react-select");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_select__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_select_animated__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-select/animated */ "react-select/animated");
/* harmony import */ var react_select_animated__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_select_animated__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./AddPhoto.jsx */ "./src/AddPhoto.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */














 //import ReactLeafletSearch from "react-leaflet-search";



const animatedComponents = react_select_animated__WEBPACK_IMPORTED_MODULE_14___default()();
class PhotoAddStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();

    _defineProperty(this, "onNewLocationClick", e => {
      this.setNewLocation();
      this.resetSelectedLocation();
    });

    _defineProperty(this, "setNewLocation", () => {
      this.setState({
        newLocation: true
      });
    });

    _defineProperty(this, "_next", () => {
      let currentStep = this.state.currentStep;
      currentStep = currentStep >= 2 ? 3 : currentStep + 1;
      this.setState({
        currentStep: currentStep
      });
    });

    _defineProperty(this, "_prev", () => {
      let currentStep = this.state.currentStep;
      currentStep = currentStep <= 1 ? 1 : currentStep - 1;
      this.setState({
        currentStep: currentStep
      });
    });

    _defineProperty(this, "changeMarkers", () => {
      // loading leaflet in componentDidMount because it doenst support SSR
      const L = __webpack_require__(/*! leaflet */ "leaflet");

      const userMarker = new L.Icon({
        iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_8__["default"],
        iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_8__["default"],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
        shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
        shadowAnchor: [13, 40],
        iconSize: new L.Point(32, 40)
      });
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
        iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
        shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
        shadowAnchor: [13, 40],
        iconSize: new L.Point(32, 40)
      });
    });

    _defineProperty(this, "onCategoryCreate", async option => {
      const label = option; // check if slug is available, if not, add number

      const value = slugify__WEBPACK_IMPORTED_MODULE_15___default()(option, {
        replacement: '-',
        // replace spaces with replacement character, defaults to `-`
        remove: undefined,
        // remove characters that match regex, defaults to `undefined`
        lower: true,
        // convert to lower case, defaults to `false`
        strict: true // strip special characters except replacement, defaults to `false`

      });
      const query = `mutation CreateLocationCategory($input: createLocationCategoryInput) {
            createLocationCategory(input: $input){
            locationCategory{
              label
              value
              id
            }
          }
          }`;
      let input = {};
      input['data'] = {
        "label": label,
        "value": value
      };
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        input
      }, true);

      if (data) {
        const {
          label,
          value,
          id
        } = data.createLocationCategory.locationCategory;
        this.setState(prevState => {
          const oldCategories = [...this.state.locationCategoryValues];
          const newCategory = {
            "label": label,
            "value": value,
            "id": id
          };
          oldCategories.push(newCategory);
          const selectedValues = this.state.location_categories != null ? this.state.location_categories : [];
          selectedValues.push(newCategory);
          const categoryIds = this.state.location.location_categories ? this.state.location.location_categories : [];
          categoryIds.push(newCategory.id);
          return {
            location: { ...prevState.location,
              location_categories: [...categoryIds]
            },
            locationCategoryValues: [...oldCategories],
            location_categories: selectedValues
          };
        });
        return {
          label: label,
          value: value
        };
      }
    });

    _defineProperty(this, "handleSelect", (newValue, name) => {
      /*
      set the ID of the location_categories to location object
      and update the selected values in object location_categories in the state
      */
      let ids;

      if (newValue !== null) {
        ids = newValue.map(item => {
          return item.id;
        });
      } else {
        ids = [];
      }

      this.setState(prevState => ({ ...prevState,
        location: { ...prevState.location,
          [name]: ids
        },
        [name]: newValue
      }));
    });

    _defineProperty(this, "createLocation", async () => {
      console.log('creating location');
      const {
        location,
        location: {
          title
        }
      } = this.state;
      console.log(location, title);
      const slug = slugify__WEBPACK_IMPORTED_MODULE_15___default()(title, {
        replacement: '-',
        // replace spaces with replacement character, defaults to `-`
        remove: undefined,
        // remove characters that match regex, defaults to `undefined`
        lower: true,
        // convert to lower case, defaults to `false`
        strict: true // strip special characters except replacement, defaults to `false`

      });
      const query = `mutation CreateLocation($input: createLocationInput) {
            createLocation(input: $input){
            location{
              slug
              id
            }
          }
          }`;
      let input = {};
      location['slug'] = slug;
      input['data'] = location;
      console.log(input);
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        input
      }, true);

      if (data) {
        return data.createLocation;
      }
    });

    _defineProperty(this, "handleInputChange", (event, property) => {
      console.log('handling on input chagne');
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState(prevState => {
        let stateFields;

        if (property === 'location') {
          console.log('setting location state');
          stateFields = { ...prevState,
            location: { ...prevState.location,
              [name]: value
            }
          };
        } else {
          stateFields = { ...prevState,
            photo: { ...prevState.photo,
              [name]: value
            }
          };
        }

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
        photo: {},
        blob: null,
        locationKnown: false
      });
    });

    _defineProperty(this, "photoValidation", file => {
      if (file.size > 27000000) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: 'Selecteer een afbeelding kleiner dan 27MB.'
          }
        }));
        return;
      } else {
        this.setState(prevState => {
          const invalidFields = { ...prevState.invalidFields
          };
          if (invalidFields.hasOwnProperty("blob")) delete invalidFields['blob'];
          return {
            invalidFields
          };
        });
      }
    });

    _defineProperty(this, "onFileChange", async e => {
      const file = e.target.files[0];
      this.setState({
        blob: e.target.files[0]
      });
      this.photoValidation(file);
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

      let exifrGps = await exifr__WEBPACK_IMPORTED_MODULE_6___default.a.gps(file);
      let output = await exifr__WEBPACK_IMPORTED_MODULE_6___default.a.parse(file, ['LensModel']); // if the photo contains gps data

      if (exifrGps) {
        let {
          longitude,
          latitude
        } = exifrGps;
        this.setState(prevState => ({ ...prevState,
          locationKnown: true,
          photo: { ...prevState.photo,
            longitude,
            latitude
          }
        }));
      }

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

            const shutterVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime").numerator / exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime").denominator;
            let shutterspeedVal = shutterVal > 1 ? shutterVal : '1/' + 1 / shutterVal;
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

    _defineProperty(this, "createSlug", async (slug, suffix, previousSuffix) => {
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

        var n = str.lastIndexOf(previousSuffix);
        slug.replace(previousSlug, '');
        const createdSuffix = '-' + suffix;
        let adjustedSlug = slug + reactedSlug;
        return this.createSlug(adjustedSlug, suffix, createdSuffix);
      }
    });

    _defineProperty(this, "fetchCategories", async () => {
      // build the graphql query
      const query = `query locationCategories{
            locationCategories {
              label
              value
              id
            }
            months {
              label
              value
              id
            }
          }`;
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {}, true);
      this.setState({
        locationCategoryValues: result.locationCategories,
        monthValues: result.months
      });
    });

    _defineProperty(this, "onLocationSelect", location => {
      // if existing location is selected, add to the state
      this.setState(prevState => ({ ...prevState,
        selectedLocation: location,
        photo: { ...prevState.photo,
          location: location.id
        }
      }));
    });

    _defineProperty(this, "resetSelectedLocation", () => {
      this.setState(prevState => ({ ...prevState,
        selectedLocation: null,
        photo: { ...prevState.photo,
          location: null
        }
      }));
    });

    _defineProperty(this, "updateNewLocationCoords", (lat, lng) => {
      console.log(lat, lng);
      this.setState(prevState => ({ ...prevState,
        newLocation: false,
        location: { ...prevState.location,
          longitude: lng,
          latitude: lat
        }
      }));
    });

    _defineProperty(this, "findNearbyLocations", async (lat, lng) => {
      // calculate min and max latitudes
      //echo 'submit';
      //const lat = this.state.photo.latitude;
      //const lng = this.state.photo.longitude;
      const distance = 30; //in km

      const radius = 6371; // earth's radius in km = ~6371

      function rad2deg(angle) {
        return angle * 57.29577951308232; // angle / Math.PI * 180
      }

      function deg2rad(angle) {
        return angle * 0.017453292519943295; // (angle / 180) * Math.PI;
      } // latitude boundaries


      const maxlat = lat + rad2deg(distance / radius);
      const minlat = lat - rad2deg(distance / radius); // longitude boundaries (longitude gets smaller when latitude increases)

      const maxlng = lng + rad2deg(distance / radius / Math.cos(deg2rad(lat)));
      const minlng = lng - rad2deg(distance / radius / Math.cos(deg2rad(lat)));

      function distanceFromLocation(lat1, lon1, lat2, lon2) {
        const theta = lon1 - lon2;
        let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        const miles = dist * 60 * 1.1515;
        return miles * 1.609344;
      } //$query = "template=location, place.lat>=$minlat, place.lat<=$maxlat, place.lng>=$minlng, place.lng<=$maxlng ";


      const query = `query locationsInRange($minlat:Float!, $maxlat:Float!, $minlng:Float!, $maxlng:Float!){
            locations(where:{latitude_gte:$minlat,latitude_lte:$maxlat,longitude_gte:$minlng,longitude_lte:$maxlng}) {
            title
            longitude
            latitude
            id
            photos {
                id
                likes
                title
                slug
                photo {
                    url 
                }
            }
            }
          }`;
      const search = {
        "minlat": minlat,
        "maxlat": maxlat,
        "minlng": minlng,
        "maxlng": maxlng
      };
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, search, true);

      if (result.locations.length > 0) {
        console.log('found locations', result.locations);
        const locations = result.locations; //sort items on distance

        locations.forEach(location => {
          // lat and lng are from this.state.photo
          const locDistance = distanceFromLocation(location.latitude, location.longitude, lat, lng);
          location['distance'] = locDistance;
        });
        locations.sort(function (a, b) {
          var keyA = new Date(a.distance),
              keyB = new Date(b.distance); // Compare the 2 dates

          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        return locations;
      } else {
        return null;
      }
    });

    this.state = {
      currentStep: 1,
      photo: {},
      photoLoading: false,
      tempFile: null,
      onDrop: false,
      onDragOver: false,
      uploadPercentage: 0,
      invalidFields: {},
      blob: null,
      map: {
        longitude: null,
        latitude: null,
        zoom: 13
      },
      locationKnown: false,
      selectedLocation: null,
      locationCategoryValues: [],
      monthValues: [],
      months: null,
      location_categories: null,
      newLocation: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  previousButton() {
    let currentStep = this.state.currentStep;

    if (currentStep !== 1) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "block px-3 py- my-2 text-white rounded text-l bg-gray-700",
        type: "button",
        onClick: this._prev
      }, "Vorige");
    }

    return null;
  }

  nextButton(disabled, btnClass) {
    let currentStep = this.state.currentStep;

    if (currentStep < 2) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: disabled,
        className: btnClass,
        type: "button",
        onClick: this._next
      }, "Volgende");
    }

    return null;
  }

  componentDidMount(prevProps, prevState) {
    // handle blob in 'onFileChange' from state
    // blob gets set on choosing file
    this.changeMarkers();
  }

  async handleSubmit(e) {
    console.log('submitted');
    e.preventDefault();
    e.persist();
    const {
      blob,
      newLocation,
      photo: {
        title
      }
    } = this.state; // check if an image is given, and title, if not show error and return null;

    if (!blob || !title) {
      if (!blob) {
        console.log('no blob in state');
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: 'Voeg je nog een foto toe? 📸'
          }
        }));
      }

      if (!title) {
        console.log('no title in state.photo');
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            title: 'Wat is de titel van je foto? 📸'
          }
        }));
      }

      console.log('returning');
      return;
    }

    let createdLocation = null;

    if (newLocation) {
      createdLocation = await this.createLocation();
      console.log(createdLocation);
    } else {
      console.log('no new location found');
    } // check if slug is available, if not, add number


    let slug = slugify__WEBPACK_IMPORTED_MODULE_15___default()(title, {
      replacement: '-',
      // replace spaces with replacement character, defaults to `-`
      remove: undefined,
      // remove characters that match regex, defaults to `undefined`
      lower: true,
      // convert to lower case, defaults to `false`
      strict: true // strip special characters except replacement, defaults to `false`

    });
    const createdSlug = await this.createSlug(slug); // if slug is available, add to the state

    this.setState(prevState => {
      return { ...prevState,
        photo: { ...prevState.photo,
          slug: createdSlug,
          location: createdLocation !== null ? createdLocation.location.id : prevState.photo.location,
          date: prevState.photo.date ? new Date(prevState.photo.date) : null,
          iso: prevState.photo.iso ? prevState.photo.iso.toString() : null,
          aperture: prevState.photo.aperture ? prevState.photo.aperture.toString() : null,
          shutterspeed: prevState.photo.shutterspeed ? prevState.photo.shutterspeed.toString() : null
        }
      };
    }); //create photo page with info
    // query for new photo

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
                    location {
                        id
                        title
                        longitude
                        latitude
                    }
                }
            }
        }`;
    let input = {};
    input['data'] = this.state.photo;
    delete input.data.blob;
    delete input.data.longitude;
    delete input.data.latitude;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      input
    }, true);

    if (data) {
      console.log('photo page created, uploading foto..'); //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
        //if the query returns an id in data, the photo is created
        // redirect to created photo
        const {
          slug
        } = data.createPhoto.photo;
        const {
          history
        } = this.props;
        history.push({
          pathname: `/foto/${slug}`
        });
      };

      const formData = new FormData();
      const {
        blob: uploadedFile
      } = this.state;
      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append('ref', 'photo');
      formData.append('field', 'photo');
      formData.append('refId', data.createPhoto.photo.id);
      const request = new XMLHttpRequest();
      request.open('POST', `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      console.log('failed');
    }
  }

  render() {
    let btnClass = "block px-3 py- my-2 text-white rounded text-l";
    let disabled = this.state.currentStep == 1 ? this.state.photo.title === undefined || this.state.photo.title === "" || this.state.blob === null : false;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      name: "photoAdd",
      encType: "multipart/form-data",
      onSubmit: this.handleSubmit,
      className: "block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "my-2 font-bold"
    }, "Starpi Foto toevoegen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_16__["default"], {
      currentStep: this.state.currentStep,
      state: this.state,
      fileInput: this.fileInput,
      onFileChange: this.onFileChange,
      onChange: this.handleInputChange,
      handleOnDrop: this.handleOnDrop,
      handleOnDragOver: this.handleOnDragOver,
      handleOnDragLeave: this.handleOnDragLeave,
      removeImage: this.removeImage
    }), this.state.currentStep === 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Step2, {
      currentStep: this.state.currentStep,
      state: this.state,
      findNearbyLocations: this.findNearbyLocations,
      onLocationSelect: this.onLocationSelect,
      resetSelectedLocation: this.resetSelectedLocation,
      activeLocation: this.state.selectedLocation,
      onChange: this.handleInputChange,
      updateNewLocationCoords: this.updateNewLocationCoords,
      handleSelect: this.handleSelect,
      onCategoryCreate: this.onCategoryCreate,
      fetchCategories: this.fetchCategories,
      onNewLocationClick: this.onNewLocationClick,
      setNewLocation: this.setNewLocation
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "shadow w-full bg-grey-light"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "bg-blue-500 text-xs leading-none py-1 text-center text-white",
      style: {
        width: this.state.uploadPercentage + '%'
      }
    }, this.state.uploadPercentage + '%')), this.previousButton(), this.nextButton(disabled, btnClass)));
  }

}

class Step2 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    console.log(props);
    super(props);

    _defineProperty(this, "displayLocations", async (lat, lng) => {
      const nearbyLocations = await this.props.findNearbyLocations(lat, lng);

      if (nearbyLocations === null) {
        this.props.setNewLocation();
      }

      this.setState({
        nearbyLocations,
        loadingNearbyLocations: false
      });
    });

    _defineProperty(this, "refmarker", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(this, "map", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(this, "updatePosition", () => {
      const marker = this.refmarker.current;
      const map = this.map.current;

      if (marker != null) {
        console.log('updating position', marker.leafletElement.getLatLng());
        this.setState({
          marker: marker.leafletElement.getLatLng(),
          zoom: map.leafletElement.getZoom(),
          loadingNearbyLocations: true
        });
      }

      this.displayLocations(this.state.marker.lat, this.state.marker.lng);
      console.log(marker.leafletElement.getLatLng().lat, marker.leafletElement.getLatLng().lng);
      this.props.updateNewLocationCoords(marker.leafletElement.getLatLng().lat, marker.leafletElement.getLatLng().lng);
    });

    _defineProperty(this, "onChange", e => {
      this.props.onChange(e, 'location');
    });

    const {
      locationKnown
    } = props.state;
    const zoom = locationKnown ? props.state.map.zoom : 6;
    this.state = {
      nearbyLocations: null,
      draggable: !props.locationKnown,
      marker: {
        lat: 52.243712,
        lng: 5.4411363
      },
      zoom,
      loadingNearbyLocations: false
    };
  }

  async componentDidMount() {
    if (this.props.currentStep == 2) {
      console.log('mounting');
      const {
        locationKnown
      } = this.props.state;

      if (locationKnown) {
        console.log('location known');
        const {
          latitude,
          longitude
        } = this.props.state.photo;
        console.log('getting long lat', latitude, longitude);
        this.props.updateNewLocationCoords(latitude, longitude);
        this.displayLocations(latitude, longitude);
        this.setState({
          marker: {
            lat: latitude,
            lng: longitude
          }
        });
      }

      this.props.fetchCategories();
    }
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    const {
      locationCategoryValues,
      location_categories,
      newLocation,
      monthValues
    } = this.props.state;
    const {
      marker
    } = this.state;
    const position = [marker.lat, marker.lng];
    const {
      nearbyLocations,
      zoom,
      loadingNearbyLocations
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__["Map"], {
      className: "map",
      id: "photoLocation",
      center: position,
      zoom: zoom,
      ref: this.map
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__["Marker"], {
      position: position,
      ref: this.refmarker,
      draggable: this.state.draggable,
      onDragend: this.updatePosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_7__["Popup"], null, "Foto locatie"))), loadingNearbyLocations && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaSpinner"], null), nearbyLocations && !newLocation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: ""
    }, "Bedoel je misschien deze locatie?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex -mx-2"
    }, nearbyLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCard_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
      activeLocation: this.props.activeLocation,
      key: location.id,
      location: location,
      onClick: this.props.onLocationSelect
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.props.onNewLocationClick,
      className: "rounded bg-blue-500 text-white w-full p-2"
    }, "Nee, nieuwe locatie toevoegen")), newLocation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Nieuwe locatie toevoegen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Titel",
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      type: "text",
      name: "desc",
      onChange: this.onChange,
      placeholder: "Beschrijving van de locatie"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      type: "text",
      name: "directions",
      onChange: this.onChange,
      placeholder: "Beste manier om hier naar toe te reizen? Is bijvoorbeeld er een parkeerplaats dichtbij, stopt er een bus?"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      type: "text",
      name: "whattoshoot",
      onChange: this.onChange,
      placeholder: "Tips en advies, wat kan je fotograferen op deze locatie?"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_13___default.a, {
      components: animatedComponents,
      closeMenuOnSelect: false,
      isMulti: true,
      options: monthValues,
      placeholder: "Beste maand om te fotograferen",
      onChange: e => {
        this.props.handleSelect(e, 'months');
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select_creatable__WEBPACK_IMPORTED_MODULE_12___default.a, {
      components: animatedComponents,
      isMulti: true,
      onChange: e => {
        this.props.handleSelect(e, 'location_categories');
      },
      options: locationCategoryValues,
      placeholder: "Categorie\xEBn",
      value: location_categories,
      onCreateOption: this.props.onCategoryCreate,
      formatCreateLabel: label => `Maak nieuwe categorie: "${label}`
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "submit",
      className: "block px-3 py- my-2 text-white rounded text-l bg-blue-500"
    }, "Uploaden"));
  }

}

/***/ }),

/***/ "./src/PhotoAddToLocation.jsx":
/*!************************************!*\
  !*** ./src/PhotoAddToLocation.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoAddToLocation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _services_httpService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/httpService */ "./src/services/httpService.js");
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! exif-js */ "exif-js");
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(exif_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! exifr */ "exifr");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(exifr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddPhoto.jsx */ "./src/AddPhoto.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */







class PhotoAddToLocation extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "fetchLocation", async () => {
      const query = `query location($id:ID!) {
            location(id:$id) {
              title
              id
              slug
            }
          }`;
      let {
        params: {
          id
        }
      } = this.props.match;
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        id
      }, true);
      return data;
    });

    _defineProperty(this, "photoValidation", file => {
      if (file.size > 27000000) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: 'Selecteer een afbeelding kleiner dan 27MB.'
          }
        }));
        return;
      } else {
        this.setState(prevState => {
          const invalidFields = { ...prevState.invalidFields
          };
          if (invalidFields.hasOwnProperty("blob")) delete invalidFields['blob'];
          return {
            invalidFields
          };
        });
      }
    });

    _defineProperty(this, "onFileChange", async e => {
      const file = e.target.files[0];
      this.setState({
        blob: e.target.files[0]
      });
      this.photoValidation(file);
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

      reader.readAsDataURL(file);
      let exifrGps = await exifr__WEBPACK_IMPORTED_MODULE_4___default.a.gps(file);
      let output = await exifr__WEBPACK_IMPORTED_MODULE_4___default.a.parse(file, ['LensModel']); // if the photo contains gps data

      if (exifrGps) {
        let {
          longitude,
          latitude
        } = exifrGps;
        this.setState(prevState => ({ ...prevState,
          locationKnown: true,
          photo: { ...prevState.photo,
            longitude,
            latitude
          }
        }));
      }

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

            const shutterVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime").numerator / exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ExposureTime").denominator;
            let shutterspeedVal = shutterVal > 1 ? shutterVal : '1/' + 1 / shutterVal;
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
    });

    _defineProperty(this, "handleInputChange", (event, property) => {
      console.log('handling on input chagne');
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState(prevState => {
        let stateFields;

        if (property === 'location') {
          console.log('setting location state');
          stateFields = { ...prevState,
            location: { ...prevState.location,
              [name]: value
            }
          };
        } else {
          stateFields = { ...prevState,
            photo: { ...prevState.photo,
              [name]: value
            }
          };
        }

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
        photo: {},
        blob: null,
        locationKnown: false
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

    _defineProperty(this, "createSlug", async (slug, suffix, previousSuffix) => {
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

        var n = str.lastIndexOf(previousSuffix);
        slug.replace(previousSlug, '');
        const createdSuffix = '-' + suffix;
        let adjustedSlug = slug + reactedSlug;
        return this.createSlug(adjustedSlug, suffix, createdSuffix);
      }
    });

    this.state = {
      photo: {},
      photoLoading: false,
      tempFile: null,
      onDrop: false,
      onDragOver: false,
      uploadPercentage: 0,
      invalidFields: {},
      blob: null,
      location: null
    };
    this.fileInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const data = await this.fetchLocation();

    if (data) {
      this.setState({
        location: data.location,
        photo: {
          location: data.location.id
        }
      });
    } else {
      this.setState({
        location: null
      });
    }
  }

  async handleSubmit(e) {
    console.log('submitted');
    e.preventDefault();
    e.persist();
    const {
      blob,
      newLocation,
      photo: {
        title
      }
    } = this.state; // check if an image is given, and title, if not show error and return null;

    if (!blob || !title) {
      if (!blob) {
        console.log('no blob in state');
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: 'Voeg je nog een foto toe? 📸'
          }
        }));
      }

      if (!title) {
        console.log('no title in state.photo');
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            title: 'Wat is de titel van je foto? 📸'
          }
        }));
      }

      console.log('returning');
      return;
    } // check if slug is available, if not, add number


    let slug = slugify__WEBPACK_IMPORTED_MODULE_5___default()(title, {
      replacement: '-',
      // replace spaces with replacement character, defaults to `-`
      remove: undefined,
      // remove characters that match regex, defaults to `undefined`
      lower: true,
      // convert to lower case, defaults to `false`
      strict: true // strip special characters except replacement, defaults to `false`

    });
    const createdSlug = await this.createSlug(slug); // if slug is available, add to the state

    this.setState(prevState => {
      return { ...prevState,
        photo: { ...prevState.photo,
          slug: createdSlug,
          date: prevState.photo.date ? new Date(prevState.photo.date) : null,
          iso: prevState.photo.iso ? prevState.photo.iso.toString() : null,
          aperture: prevState.photo.aperture ? prevState.photo.aperture.toString() : null,
          shutterspeed: prevState.photo.shutterspeed ? prevState.photo.shutterspeed.toString() : null
        }
      };
    }); //create photo page with info
    // query for new photo

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
                    location {
                        id
                        title
                        longitude
                        latitude
                    }
                }
            }
        }`;
    let input = {};
    input['data'] = this.state.photo;
    delete input.data.blob;
    delete input.data.longitude;
    delete input.data.latitude;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      input
    }, true);

    if (data) {
      console.log('photo page created, uploading foto..'); //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
        //if the query returns an id in data, the photo is created
        // redirect to created photo
        const {
          slug
        } = data.createPhoto.photo;
        const {
          history
        } = this.props;
        history.push({
          pathname: `/foto/${slug}`
        });
      };

      const formData = new FormData();
      const {
        blob: uploadedFile
      } = this.state;
      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append('ref', 'photo');
      formData.append('field', 'photo');
      formData.append('refId', data.createPhoto.photo.id);
      const request = new XMLHttpRequest();
      request.open('POST', `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      console.log('failed');
    }
  }

  render() {
    const {
      location
    } = this.state;

    if (location === null) {
      return null;
    }

    let btnClass = "block px-3 py- my-2 text-white rounded text-l";
    let disabled = this.state.photo.title === undefined || this.state.photo.title === "" || this.state.blob === null ? true : false;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      name: "photoAdd",
      encType: "multipart/form-data",
      onSubmit: this.handleSubmit,
      className: "block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full rounded p-2 border"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "font-bold"
    }, "Foto toevoegen aan locatie: ", location.title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
      state: this.state,
      fileInput: this.fileInput,
      onFileChange: this.onFileChange,
      onChange: this.handleInputChange,
      handleOnDrop: this.handleOnDrop,
      handleOnDragOver: this.handleOnDragOver,
      handleOnDragLeave: this.handleOnDragLeave,
      removeImage: this.removeImage
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      disabled: disabled,
      type: "submit",
      className: btnClass
    }, "Uploaden")));
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
    pathname: `/foto/${photo.slug}`,
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
    src: photo.photo[0].url,
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
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
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
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
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
    const position = [photoBySlug.location.latitude, photoBySlug.location.longitude];
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

/***/ "./src/PhotoListStrapi.jsx":
/*!*********************************!*\
  !*** ./src/PhotoListStrapi.jsx ***!
  \*********************************/
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
    //const params = new URLSearchParams(search);
    // If category is provided in the query string, add them to our variables 
    const vars = {}; //if (params.get('category')) vars.category = params.get('category');
    // build the graphql query

    const query = `query photos {
            photos {
            title
                        desc
                        photo {
                          url
                        }
                        slug
                        user {
                          username
                        }
                        date
                        brand
                        shutterspeed
                        iso
                        aperture
                        camera
                        likes
                        location {
                            longitude
                            latitude
                            title
                            slug
                            createdAt
                        }
            }
          }`; // provide the query with the variables 

    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true);
    console.log(data);
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
        photos: data.photos
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

/***/ "./src/Register.jsx":
/*!**************************!*\
  !*** ./src/Register.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "./node_modules/@hapi/joi/lib/index.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Form_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form.jsx */ "./src/Form.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class RegisterForm extends _Form_jsx__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: ''
      },
      errors: {}
    });

    _defineProperty(this, "schema", {
      email: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email({
        tlds: {
          allow: false
        }
      }).required().messages({
        "string.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`
      }),
      password: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je wachtwoord nog even in? 😉`,
        "any.required": `Vul je je wachtwoord nog even in? 😉`
      }),
      firstname: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je voornaam nog even in? 😉`,
        "any.required": `Vul je je voornaam nog even in? 😉`
      }),
      lastname: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je achternaam nog even in? 😉`,
        "any.required": `Vul je je achternaam nog even in? 😉`
      }),
      username: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().regex(/^\S*$/).required().messages({
        "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
        "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
        "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten"
      })
    });

    _defineProperty(this, "createUser", async () => {
      const query = `mutation register($input: UserInput!) {
            register(input: $input) {
                jwt
                user {
                  id
                  email
                  username
                }
            }
          } `;
      const {
        data
      } = this.state;
      let input = { ...data
      };
      input['role'] = '5eef1a60e3b96d29e2d1d1ac';
      console.log(input);
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
        input
      }, true, true);

      if (result) {
        // user registered and getting JWT token!
        const {
          register
        } = result;
        const {
          jwt,
          user: {
            email,
            id,
            username
          }
        } = register;
        console.log(jwt, id, email, username);
        localStorage.setItem('token', jwt);
        this.props.history.push('/');
      }
    });

    _defineProperty(this, "doSubmit", () => {
      // call server
      // redirect user to homepage
      this.createUser();
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "m-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.handleSubmit,
      className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl text-green-500"
    }, "Aanmelden bij Spotshare"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex"
    }, this.renderInput('firstname', 'Voornaam', 'Voornaam', 'text', 'w-1/2 mr-2'), this.renderInput('lastname', 'Achternaam', 'Achternaam', 'text', 'w-1/2')), this.renderInput('username', 'Gebruikersnaam', 'Gebruikersnaam'), this.renderInput('email', 'Email', 'Emailadres'), this.renderInput('password', 'Wachtwoord', 'Vul je wachtwoord in', 'password'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center justify-between"
    }, this.renderButton('Kom bij de club!'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
      className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600",
      to: "/inloggen"
    }, "Inloggen")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (RegisterForm);

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

async function graphQLFetch(query, variables = {}, isBlog = false, returnError = false) {
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
        if (returnError) return result;
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`${error.extensions.code}\n ${error.message}`);
        if (returnError) return result;
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "3dd5bee5e47514a333b518f1c68a0831.svg");

/***/ }),

/***/ "./src/images/markerShadow.png":
/*!*************************************!*\
  !*** ./src/images/markerShadow.png ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "34bcdf28c1687c9e3e7bf72842119b4f.png");

/***/ }),

/***/ "./src/images/userMarker.svg":
/*!***********************************!*\
  !*** ./src/images/userMarker.svg ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "0325b3fec9806c898205b7d408b0b963.svg");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoListStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoListStrapi.jsx */ "./src/PhotoListStrapi.jsx");
/* harmony import */ var _PhotoReport_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoReport.jsx */ "./src/PhotoReport.jsx");
/* harmony import */ var _PhotoEdit_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoEdit.jsx */ "./src/PhotoEdit.jsx");
/* harmony import */ var _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoDetailStrapi.jsx */ "./src/PhotoDetailStrapi.jsx");
/* harmony import */ var _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LocationDetailStrapi.jsx */ "./src/LocationDetailStrapi.jsx");
/* harmony import */ var _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PhotoAddStrapi.jsx */ "./src/PhotoAddStrapi.jsx");
/* harmony import */ var _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PhotoAddToLocation.jsx */ "./src/PhotoAddToLocation.jsx");
/* harmony import */ var _About_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./About.jsx */ "./src/About.jsx");
/* harmony import */ var _NotFound_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NotFound.jsx */ "./src/NotFound.jsx");
/* harmony import */ var _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./BlogPost.jsx */ "./src/BlogPost.jsx");
/* harmony import */ var _Register_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Register.jsx */ "./src/Register.jsx");
/* harmony import */ var _Login_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Login.jsx */ "./src/Login.jsx");












const routes = [{
  path: '/aanmelden',
  component: _Register_jsx__WEBPACK_IMPORTED_MODULE_10__["default"],
  exact: true
}, {
  path: '/inloggen',
  component: _Login_jsx__WEBPACK_IMPORTED_MODULE_11__["default"],
  exact: true
}, {
  path: '/foto/toevoegen',
  component: _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
  exact: true
}, {
  path: '/foto/toevoegen/:id',
  component: _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_6__["default"],
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
  component: _PhotoListStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  path: '/bewerken/:id',
  component: _PhotoEdit_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  path: '/report',
  component: _PhotoReport_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]
}, {
  path: '/about',
  component: _About_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  path: '/niet-gevonden',
  component: _NotFound_jsx__WEBPACK_IMPORTED_MODULE_8__["default"],
  exact: true
}, {
  path: '/*',
  component: _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]
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

/***/ "react-icons/fa":
/*!*********************************!*\
  !*** external "react-icons/fa" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/fa");

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

/***/ "react-select":
/*!*******************************!*\
  !*** external "react-select" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-select");

/***/ }),

/***/ "react-select/animated":
/*!****************************************!*\
  !*** external "react-select/animated" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-select/animated");

/***/ }),

/***/ "react-select/creatable":
/*!*****************************************!*\
  !*** external "react-select/creatable" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-select/creatable");

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

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "url-search-params":
/*!************************************!*\
  !*** external "url-search-params" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-search-params");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

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