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
/******/ 	var hotCurrentHash = "e93d83dbe743b900bd7b";
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
  const activeRoute = _src_routes_js__WEBPACK_IMPORTED_MODULE_6__["default"].find(route => Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, route)); //   console.log(routes);
  //   console.log(req.path);
  //   console.log(activeRoute);
  //   console.log(activeRoute.component.fetchData);

  let initialData;

  if (activeRoute && activeRoute.component.fetchData) {
    // get the this.props.match to find the /edit/2 id from url, and send with fetchData function
    const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, activeRoute);
    console.log(match); // get the index search query of the url

    const index = req.url.indexOf("?"); // index -1 is given when there is no ? sign

    const search = index !== -1 ? req.url.substr(index) : null;
    console.log("line numer 27: ", activeRoute, "fetching data", search);
    initialData = await activeRoute.component.fetchData(match, search); //console.log(initialData);
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
  showInputClass += !tempFile && !photoLoading ? " block" : " hidden";
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
  }, " ", "of ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, "selecteer"), " een bestand", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-sm block text-gray-300"
  }, " ", "(Hoge resolutie aangeraden, maximaal 27MB)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
    className: "special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-r-none py-2 px-3 relative text-sm"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex -mr-px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mb-2 flex items-center  bg-grey-lighter rounded rounded-l-none border border-l-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
  }, "s"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap items-stretch w-full relative mb-2 mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex -mr-px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
  }, "iso")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "iso",
    placeholder: "iso",
    value: iso || "",
    onChange: props.onChange,
    className: "special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap items-stretch w-full relative mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex -mr-px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm"
  }, "f/")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "aperture",
    placeholder: "Diafragma",
    onChange: props.onChange,
    value: aperture || "",
    className: "special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var react_sanitized_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-sanitized-html */ "react-sanitized-html");
/* harmony import */ var react_sanitized_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_sanitized_html__WEBPACK_IMPORTED_MODULE_5__);







const BlogPost = props => {
  const [article, setArticleBySlug] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);

  const getInitialArticle = async props => {
    let _article = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_article) {
      _article = await BlogPost.fetchData(props.match);
    }

    setArticleBySlug(_article);
  };

  Object(_components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])(() => {
    getInitialArticle(props);
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getInitialArticle(props);
  }, [props.match]);

  if (article === null) {
    console.log("slug is nullllll");
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
      to: "/niet-gevonden"
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "page",
    className: "px-6 py-24"
  }, article && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-4xl leading-tight text-center"
  }, article.articleBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "",
    src: "",
    alt: article.articleBySlug.title
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_sanitized_html__WEBPACK_IMPORTED_MODULE_5___default.a, {
    allowedAttributes: {
      a: ["href"],
      img: ["src"]
    },
    allowedTags: ["a", "figure", "img"],
    html: article.articleBySlug.body
  }))));
};

BlogPost.fetchData = async (match, search, showError) => {
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
  console.log(result);
  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPost);

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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, _routes__WEBPACK_IMPORTED_MODULE_2__["default"].map(attrs => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], _extends({}, attrs, {
    key: attrs.path
  }))));
}

/***/ }),

/***/ "./src/FBConnect.jsx":
/*!***************************!*\
  !*** ./src/FBConnect.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");


/* to support IE */




class FBConnect extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    const {
      location
    } = this.props; // try {
    //   console.log(action, action.search);
    //   const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
    //   const response = yield call(request, requestURL, { method: "GET" });
    //   if (response.jwt) {
    // 	// Set the user's credentials
    // 	yield all([
    // 	  call(auth.setToken, response.jwt, true),
    // 	  call(auth.setUserInfo, response.user, true),
    // 	]);
    // 	yield call(forwardTo, "/");
    //   }
    // } catch (error) {
    //   yield call(forwardTo, "/auth/login");
    // }
    // const search = this.props.location.search; // could be '?foo=bar'
    // const params = new URLSearchParams(search);
    // const accessToken = params.get("access_token"); // bar
    // console.log(accessToken);
    // console.log(
    // 	`http://localhost:1337/auth/facebook/callback${location.search}`
    // );

    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`http://localhost:1337/auth/facebook/callback${location.search}`).then(response => {
      // Handle success.
      console.log(response);
      console.log("Well done!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      _services_authService__WEBPACK_IMPORTED_MODULE_3__["default"].setToken(response.data.jwt);
      window.location = "/";
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Redirecting you... (nog stylen in FBConnect)");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FBConnect);

/***/ }),

/***/ "./src/ForgotPassword.jsx":
/*!********************************!*\
  !*** ./src/ForgotPassword.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");







const ForgotPassword = () => {
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [errors, setErrors] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [loginError, setLoginError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleChange = ({
    currentTarget: input
  }) => {
    const _errors = { ...errors
    };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;else delete _errors[input.name];
    const _data = { ...data
    };
    _data[input.name] = input.value;
    setData(_data);
    setErrors(_errors); // setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const schema = {
    email: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email({
      tlds: {
        allow: false
      }
    }).required().messages({
      "string.empty": `Vul je je email nog even in? 😉.`,
      "any.required": `Vul je je email nog even in? 😉.`,
      "string.email": `Vul je een geldig adres in? 😉.`
    })
  };

  const validateProperty = ({
    name,
    value
  }) => {
    console.log(name, value);
    const object = {
      [name]: value
    };
    console.log(schema);

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
      [name]: schema[name]
    });

    const result = _schema.validate(object);

    console.log(result);
    const error = result.error;
    console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true
    };

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...schema
    });

    const {
      error
    } = _schema.validate(data, options);

    console.log(error);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const doSubmit = async () => {
    // call server
    // redirect user to homepage
    console.log("submitted");
    const query = `mutation ForgotPassword($email:String!){
		forgotPassword(email:$email) {
		  ok
		}
	  }`;
    const vars = {
      email: data.email
    };
    console.log(vars);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_5__["default"])(query, vars, true);
    console.log(result);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit();
  };

  const renderButton = (label, disable = false) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" + (validate() || Object.keys(errors).length !== 0 || disable ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: validate() || Object.keys(errors).length !== 0 || disable
    }, disable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaSpinner"], {
      className: "animate-spin"
    }) : label);
  };

  const renderInput = (name, label, placeholder, type = "text", classes = "w-full", onBlur = () => {}) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name] || "",
      onChange: handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type,
      onBlur: onBlur
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit,
    className: "bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl text-green-500 text-center"
  }, "Wachtwoord resetten"), loginError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null), renderInput("email", "Email", "Emailadres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, renderButton("Wachtwoord resetten"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], {
    className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 mr-4",
    to: "/inloggen"
  }, "Inloggen"), " ", "|", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], {
    className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 ml-4",
    to: "/aanmelden"
  }, "Aanmelden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full h-full",
    style: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
      backgroundSize: `cover`,
      backgroundPosition: `center center`
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (ForgotPassword);

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
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
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
        abortEarly: false,
        allowUnknown: true
      };
      const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...this.schema
      });
      const {
        error
      } = schema.validate(this.state.data, options);
      console.log(error);
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
      console.log("returning", error);
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

  renderButton(label, disable = false) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" + (this.validate() || Object.keys(this.state.errors).length !== 0 || disable ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: this.validate() || Object.keys(this.state.errors).length !== 0 || disable
    }, disable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaSpinner"], {
      className: "animate-spin"
    }) : label);
  }

  renderInput(name, label, placeholder, type = "text", classes = "w-full", onBlur = () => {}) {
    const {
      data,
      errors
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name] || "",
      onChange: this.handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type,
      onBlur: onBlur
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./src/Home.jsx":
/*!**********************!*\
  !*** ./src/Home.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Footer_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Footer.jsx */ "./src/components/Footer.jsx");






const Home = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_2__["userContext"].Consumer, null, value => {
    console.log(value);
    return value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
      to: "/dashboard"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HomeScreen, null);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

const HomeScreen = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "py-12 sm:py-24 bg-gray-900"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container mx-auto block sm:flex px-6 items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-16 w-full mb-4 sm:mb-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-white text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-8 leading-tight"
  }, "De beste fotografie locaties vind je bij SpotShare."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/inloggen",
    className: "text-white rounded-full border-2 inline-block border-blue-500 transition duration-100 hover:border-blue-700 mr-4 px-4 py-3 sm:px-6 sm:py-4"
  }, "Inloggen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/aanmelden",
    className: "text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
  }, "Aanmelden")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rounded w-full h-64",
    style: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
      backgroundSize: `cover`,
      backgroundPosition: `center center`
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rounded-full shadow-lg px-1 py-1 sm:px-2 sm:py-2  -mt-6 ml-1 sm:ml-2 lg:ml-6 bg-white text-black inline-block justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "rounded-full w-8 h-8  mr-2  bottom-0 right-0 shadow-lg",
    src: "https://www.spotshare.nl/site/assets/files/6420/3-11-2019_19-28-29.140x140-pim2-thumbdbfotografie140.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-black mr-2 text-xs"
  }, "\uD83D\uDCF8 Pier scheveningen door Dennis Borman")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col sm:flex-row items-center "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex w-full justify-center items-center order-last sm:order-last sm:mr-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col w-full pr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex mb-4 relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: " rounded",
    src: "https://picsum.photos/200/301",
    alt: ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "rounded-full w-8 h-8 -mb-1 -mr-1 absolute bottom-0 right-0 shadow-lg",
    src: "https://picsum.photos/100/100",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: " w-full h-full rounded",
    src: "https://picsum.photos/200/302",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col w-full pt-8 pr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "mb-4 rounded",
    src: "https://picsum.photos/200/200",
    alt: ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: " w-full h-full rounded",
    src: "https://picsum.photos/200/304",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col w-full pt-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "mb-4 rounded",
    src: "https://picsum.photos/200/305",
    alt: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-6 lg:px-32 ml-auto mb-6 sm:mb-0 order-first sm:order-last"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-4xl leading-tight tracking-tight mb-2"
  }, "Vind locaties in de buurt, of juist aan de andere kant van de wereld."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mb-4"
  }, "Vind gemakkelijk fotografie locaties dichtbij, of verken locaties die je op de planinng hebt staan."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/aanmelden",
    className: "text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
  }, "Locaties zoeken")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    id: "instagram",
    className: "py-8 container px-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-6 lg:px-32 mb-6 sm:mb-0 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-4xl leading-tight tracking-tight mb-2"
  }, "Fotografie locatie inspiratie op Instagram"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mb-4"
  }, "Volg ons op instagram, en maak kans op een feature!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener",
    href: "https://www.instagram.com/spotsharenl/",
    className: "text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
  }, "Naar instagram")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rounded bg-white border shadow-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "rounded-full w-10 h-10 mr-4 border shadow-md",
    src: "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/22580636_1511695878889802_2909037587882573824_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=xkYTOC_bopsAX8PoHPa&oh=16714162d6978c1da26d94d8842446bb&oe=5F939D50",
    alt: "Volg spotshare op instagram"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "inline-block font-bold text-black text-sm"
  }, "Spotshare")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/119949137_3727750567270969_4366629272378408564_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=XrBVY27DdGYAX-NHp9v&_nc_tp=15&oh=fc3a660b6b14ab25db21a661edfd3709&oe=5F9312B0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "items-center p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "inline-block text-black text-sm"
  }, "Goedemorgen! Zonsopkomst bij Roelshoek prachtig vastgelegd door @fotogra.qui \uD83D\uDE0D\uD83D\uDC4C\uD83C\uDFFB\uD83D\uDCF8 Ook een feature op SpotShare? Voeg jouw fotolocatie toe op onze website! #spotsharenl"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-center mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaRegHeart"], {
    className: "mr-1"
  }), "150"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaRegComment"], {
    className: "mr-1"
  }), "20")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "top-0 right-0 -mt-6 sm:-mr-12 absolute rounded bg-white px-4 text-center shadow-2xl py-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "rounded-full w-20 h-20 sm:w-32 sm:h-32 border m-1 mb-3",
    src: "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/22580636_1511695878889802_2909037587882573824_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=xkYTOC_bopsAX8PoHPa&oh=16714162d6978c1da26d94d8842446bb&oe=5F939D50",
    alt: "Volg spotshare op instagram"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-black text-sm"
  }, "Spotshare"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block text-gray-500 text-xs"
  }, "@spotsharenl"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener",
    href: "https://www.instagram.com/spotsharenl/",
    className: "mt-4 text-white rounded-full bg-blue-500 hover:bg-blue-700 text-xs transition duration-100 px-3 py-2 inline-block"
  }, "Volgen"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
  }, "Klaar om je vetste locaties te delen?", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-blue-600"
  }, "Meld je vandaag nog aan.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mt-8 flex lg:flex-shrink-0 lg:mt-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inline-flex rounded-md shadow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
  }, "Aanmelden")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-3 inline-flex rounded-md shadow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
  }, "Inloggen"))))));
};

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
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_favButton_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/favButton.jsx */ "./src/components/favButton.jsx");
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PhotoCarousel.jsx */ "./src/PhotoCarousel.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */

/* eslint "react/jsx-no-undef":"off" */














const LocationDetailStrapi = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_9__["userContext"].Consumer, null, value => {
    if (value.user) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationDetailComponentRouter, {
        curUser: value.user
      });
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationDetailComponentRouter, {
        curUser: null
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (LocationDetailStrapi);

class LocationDetailComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query locationBySlug($slug: String!){
      locationBySlug(slug: $slug) {
          title
          photos {
              likes
              id
              location {
                longitude
                latitude
                id
                title
                slug
              }
              title
              slug
              user {
                
                id
                firstname
                lastname
              }
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
          directions
          whattoshoot
          location_categories {
            label
            value
          }
          months {
            label
            value
          }
          usersFavourites {
            id
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

  constructor(props) {
    super(props);

    _defineProperty(this, "updateFav", async (user, likedId, action) => {
      const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            favouriteLocations {
              id
            }
          }
        }
      }`;
      let favArray = user.favouriteLocations.map(fav => fav.id);

      if (action === "add") {
        if (!favArray.includes(likedId)) {
          favArray.push(likedId);
        } else {
          // already in favourites
          return;
        }
      } else if (action === "remove") {
        if (favArray.includes(likedId)) {
          // likedId is in array, so remove it from array
          const index = favArray.indexOf(likedId);

          if (index > -1) {
            favArray.splice(index, 1);
          }

          console.log(favArray);
        } else {
          // not in favourites
          return;
        }
      }

      const variables = {
        input: {
          where: {
            id: user.id
          },
          data: {
            favouriteLocations: favArray
          }
        }
      };
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true);
      let status = this.state.userLikedLocation;
      this.setState({
        userLikedLocation: !status
      });
    });

    const locationBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.locationBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      isServer: true,
      userLikedLocation: false,
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

    const {
      curUser: prevCurUser
    } = prevProps;
    const {
      curUser
    } = this.props;
    const {
      locationBySlug,
      isServer
    } = this.state;

    if (!isServer && curUser != null && prevCurUser !== curUser) {
      // there is a logged in user
      console.log(curUser);
      console.log(this.state);
      console.log(locationBySlug);

      if (locationBySlug.usersFavourites.filter(favourites => favourites.id === curUser.id).length > 0) {
        // check if user alreay liked the location
        this.setState({
          userLikedLocation: true
        });
      }
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
      console.log("Your current position is:");
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
      fetch("https://ipapi.co/json").then(res => res.json()).then(location => {
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

    const data = await LocationDetailComponent.fetchData(match);
    console.log(data);

    if (data.locationBySlug != null) {
      this.setState({
        locationBySlug: data.locationBySlug,
        isServer: false
      });
    } else {
      console.log("return not found");
      this.setState({
        redirect: true
      });
      console.log(this.state);
    }
  }

  render() {
    const {
      locationBySlug,
      redirect,
      isServer
    } = this.state;

    if (redirect) {
      console.log("redirect", redirect);
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
      id: "photoInfo"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full flex flex-col justify-center items-center relative",
      style: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url})`,
        backgroundSize: `cover`,
        backgroundPosition: `center center`,
        height: "80vh"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-3xl font-bold mb-1 text-white block"
    }, locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-gray-500 mr-2 text-sm"
    }, "Categorieen:"), locationBySlug.location_categories.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: `/fotolocaties/categorie/${location.value}`,
      className: "bg-green-500 py-1 px-3 text-sm rounded-full mr-2 text-white hover:bg-green-600"
    }, location.label))), !isServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "absolute right-0 bottom-0 m-10"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_9__["userContext"].Consumer, null, value => {
      console.log(value);

      if (value.user) {
        let favourite;

        if (value.user && locationBySlug.usersFavourites.filter(favourites => favourites.id === value.user.id).length > 0) {
          favourite = true;
        } else {
          favourite = false;
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_favButton_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
          favourite: favourite,
          updateFav: this.updateFav,
          user: value.user,
          likedId: locationBySlug.id,
          addTitle: "Deze locatie opslaan",
          removeTitle: "Verwijderen uit opgeslagen locaties"
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      className: "revealTooltip flex pointer justify-end items-center",
      to: `/foto/toevoegen/${locationBySlug.id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "hidden inline-block bg-white rounded py-1 px-3 h-8"
    }, "Foto aan deze locatie toevoegen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "inline-block bg-white rounded py-2 px-3 h-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_7__["FaPlus"], null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-6 "
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sm:py-10"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block sm:flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb-4 mr-4 w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: "h1"
    }, "Over fotolocatie ", locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: ""
    }, locationBySlug.desc)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb-4 w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Hoe kom ik bij ", locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: ""
    }, locationBySlug.directions))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block sm:flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb-4 mr-4 w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Wat kan ik fotograferen?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: ""
    }, locationBySlug.whattoshoot)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb-4 w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Beste tijd om te fotograferen?"), locationBySlug.months.map(month => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "mr-1 inline-block"
    }, month.label))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full mt-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: "text-xl font-bold mb-1 text-gray-800 block"
    }, "Foto's gemaakt op fotolocatie ", locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    }, photos.map((photoItem, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_10__["PhotoView"], {
        key: photoItem.id,
        index: index,
        photo: photoItem,
        deletePhoto: null
      });
    })))))));
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
    src: itemPhoto.url.replace("-original", "-thumbnail"),
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
}

const LocationDetailComponentRouter = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(LocationDetailComponent);

/***/ }),

/***/ "./src/LoginHooks.jsx":
/*!****************************!*\
  !*** ./src/LoginHooks.jsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__);







const Login = () => {
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [errors, setErrors] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [loginError, setLoginError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const schema = {
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
  };

  const loginUser = async () => {
    let input = { ...data
    };
    Object.defineProperty(input, "identifier", Object.getOwnPropertyDescriptor(input, "email"));
    delete input["email"];
    const loggedIn = await _services_authService__WEBPACK_IMPORTED_MODULE_3__["default"].login(input);

    if (loggedIn === true) {
      window.location = "/";
    } else {
      setLoginError(true);
    }
  };

  const doSubmit = () => {
    // call server
    // redirect user to homepage
    console.log("submitted");
    loginUser();
  };

  const validateProperty = ({
    name,
    value
  }) => {
    console.log(name, value);
    const object = {
      [name]: value
    };
    console.log(schema);

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
      [name]: schema[name]
    });

    const result = _schema.validate(object);

    console.log(result);
    const error = result.error;
    console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true
    };

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...schema
    });

    const {
      error
    } = _schema.validate(data, options);

    console.log(error);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit();
  };

  const renderButton = (label, disable = false) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" + (validate() || Object.keys(errors).length !== 0 || disable ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: validate() || Object.keys(errors).length !== 0 || disable
    }, disable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaSpinner"], {
      className: "animate-spin"
    }) : label);
  };

  const handleChange = ({
    currentTarget: input
  }) => {
    const _errors = { ...errors
    };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;else delete _errors[input.name];
    const _data = { ...data
    };
    _data[input.name] = input.value;
    setData(_data);
    setErrors(_errors); // setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const renderInput = (name, label, placeholder, type = "text", classes = "w-full", onBlur = () => {}) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name] || "",
      onChange: handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type,
      onBlur: onBlur
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit,
    className: "bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl text-green-500 text-center"
  }, "Inloggen bij Spotshare"), loginError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null), renderInput("email", "Email", "Emailadres"), renderInput("password", "Wachtwoord", "Vul je wachtwoord in", "password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, renderButton("Log in"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 mr-4",
    to: "/wachtwoord-vergeten"
  }, "Wachtwoord vergeten?"), " ", "|", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 ml-4",
    to: "/aanmelden"
  }, "Aanmelden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full h-full",
    style: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
      backgroundSize: `cover`,
      backgroundPosition: `center center`
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Login);

const ErrorBox = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-4 rounded border border-red-500 bg-red-200 text-red-500 font-bold my-4"
  }, "Gebruikersnaam of wachtwoord is onbekend.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 ml-4",
    to: "/wachtwoord-vergeten"
  }, "Wachtwoord vergeten?"));
};

/***/ }),

/***/ "./src/Logout.jsx":
/*!************************!*\
  !*** ./src/Logout.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");



class Logout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    _services_authService__WEBPACK_IMPORTED_MODULE_1__["default"].logout();
    window.location = "/";
  }

  render() {
    return null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Logout);

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
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _components_Footer_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Footer.jsx */ "./src/components/Footer.jsx");
/* harmony import */ var _components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/notificationCenter/notifications.jsx */ "./src/components/notificationCenter/notifications.jsx");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_8__);










const NavBar = () => {
  const [isOpen, setIsOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [openNotifications, setOpenNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();

  const closeMenu = () => {
    setIsOpen(false);
    setOpenNotifications(false);
  };

  const notIconClick = e => {
    e.preventDefault();
    setOpenNotifications(!openNotifications);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onNotClick = link => {
    setOpenNotifications(false);
    history.push(link);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    exact: true,
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png",
    className: "h-8",
    alt: "Spotshare, de mooiste fotolocaties bij jou in de buurt"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: toggleOpen,
    type: "button",
    className: "text-gray-400 hover:text-white focus:text-white focus:outline-none"
  }, isOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiX"], {
    className: "fill-current text-white"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiMenu"], {
    className: "fill-current text-white"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: `px-2 pt-2 pb-4 sm:p-0 items-center sm:flex ${isOpen ? " block" : " hidden"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/fotolocatie/volendam",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "TestLocatie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/foto/haven-volendam",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "TestFoto"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/foto/toevoegen",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "Uploaden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_5__["userContext"].Consumer, null, value => !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/aanmelden",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Aanmelden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/inloggen",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Inloggen")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: notIconClick,
    className: "relative block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_8__["IoNotificationsOutline"], {
    className: "text-2xl"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onClick: onNotClick,
    user: value.user,
    show: openNotifications
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: `/fotograaf/${value.user.slug}`,
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, value.user.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/uitloggen",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Uitloggen")))));
};

function Page() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavBar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Contents_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Footer_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_4__["ToastContainer"], null));
}

/***/ }),

/***/ "./src/PasswordReset.jsx":
/*!*******************************!*\
  !*** ./src/PasswordReset.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_8__);










const PasswordReset = () => {
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [errors, setErrors] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [loginError, setLoginError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [code, setCode] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [success, setSuccess] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["useLocation"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const {
      search
    } = location;
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_6___default.a(search);

    const _code = params.get("code");

    setCode(_code);
  }, [location]);

  const handleChange = ({
    currentTarget: input
  }) => {
    const _errors = { ...errors
    };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;else delete _errors[input.name];
    const _data = { ...data
    };
    _data[input.name] = input.value;
    setData(_data);
    setErrors(_errors); // setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const schema = {
    password: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
      "any.required": `Vul je je wachtwoord nog even in? 😉.`
    }),
    passwordConfirmation: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().equal(_hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.ref("password")).messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
      "any.required": `Vul je je wachtwoord nog even in? 😉.`,
      "any.only": `Moet gelijk zijn 😉.`
    })
  };

  const validateProperty = ({
    name,
    value
  }) => {
    const object = {
      [name]: value
    }; //const _schema = Joi.object({ [name]: schema[name] });

    const _schemaObject = {
      [name]: schema[name]
    };

    if (name.endsWith("Confirmation")) {
      const dependentInput = name.substring(0, name.indexOf("Confirmation"));
      object[dependentInput] = data[dependentInput];
      _schemaObject[dependentInput] = schema[dependentInput];
    }

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object(_schemaObject);

    const result = _schema.validate(object);

    const error = result.error;
    console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true
    };

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...schema
    });

    const {
      error
    } = _schema.validate(data, options);

    console.log(error);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const doSubmit = async () => {
    // call server
    // redirect user to homepage
    console.log("submitted");
    const query = `mutation resetPassword($password: String!, $passwordConfirmation: String!, $code: String!){
        resetPassword(password:$password, passwordConfirmation:$passwordConfirmation, code:$code) {
          jwt
        }
      }`;
    const vars = {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code: code
    };
    console.log(vars);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true, true);
    console.log(result);

    if (result.resetPassword !== null) {
      _services_authService__WEBPACK_IMPORTED_MODULE_7__["default"].setToken(result.resetPassword.jwt);
      setSuccess(true);
    } else {
      // error message
      console.log("ERROR!");
      react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error("Je code is verlopen, probeer het opnieuw.");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit();
  };

  const renderButton = (label, disable = false) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" + (validate() || Object.keys(errors).length !== 0 || disable ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: validate() || Object.keys(errors).length !== 0 || disable
    }, disable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaSpinner"], {
      className: "animate-spin"
    }) : label);
  };

  const renderInput = (name, label, placeholder, type = "text", classes = "w-full", onBlur = () => {}) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name] || "",
      onChange: handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type,
      onBlur: onBlur
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex"
  }, success ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-white w-full   px-8 md:px-16 pt-6 md:py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl text-green-500 text-center"
  }, "Wachtwoord gewijzigd!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-6 rounded bg-green-100 border border-green-200 mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-green-500"
  }, "Wachtwoord succesvol gewijzigd.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "font-bold",
    href: "/"
  }, "Klik hier"), " ", "om naar je dashboard te gaan!"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit,
    className: "bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl text-green-500 text-center"
  }, "Wachtwoord resetten"), loginError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null), renderInput("password", "Wachtwoord", "Vul je wachtwoord in", "password"), renderInput("passwordConfirmation", "Wachtwoord nogmaals", "Herhaal je wachtwoord", "password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, renderButton("Wachtwoord resetten")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full h-full",
    style: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
      backgroundSize: `cover`,
      backgroundPosition: `center center`
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (PasswordReset);

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
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! exif-js */ "exif-js");
/* harmony import */ var exif_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(exif_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! exifr */ "exifr");
/* harmony import */ var exifr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(exifr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _LocationCard_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LocationCard.jsx */ "./src/LocationCard.jsx");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-select/creatable */ "react-select/creatable");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_select_creatable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-select */ "react-select");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_select__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_select_animated__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-select/animated */ "react-select/animated");
/* harmony import */ var react_select_animated__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_select_animated__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./AddPhoto.jsx */ "./src/AddPhoto.jsx");
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _components_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */
















const animatedComponents = react_select_animated__WEBPACK_IMPORTED_MODULE_11___default()();
class PhotoAddStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "redirect", slug => {
      //if the query returns an id in data, the photo is created
      // redirect to created photo
      const {
        history
      } = this.props;
      history.push({
        pathname: `/foto/${slug}`
      });
    });
  }

  // we are rendering the actual component to have access to the Context
  // outside of the renderfunction in the next component
  // We have to pass functions to make use of the router functionality
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_14__["userContext"].Consumer, null, value => value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddPhotoForm, {
      value: value,
      redirect: this.redirect,
      fetchLocation: this.fetchLocation
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Niet ingelogd"));
  }

}

class AddPhotoForm extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
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
        iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
        iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
        shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
        shadowAnchor: [13, 40],
        iconSize: new L.Point(32, 40)
      });
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_7__["default"],
        iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_7__["default"],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
        shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
        shadowAnchor: [13, 40],
        iconSize: new L.Point(32, 40)
      });
    });

    _defineProperty(this, "onCategoryCreate", async option => {
      const label = option; // check if slug is available, if not, add number

      const value = slugify__WEBPACK_IMPORTED_MODULE_12___default()(option, {
        replacement: "-",
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
      input["data"] = {
        label: label,
        value: value
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
            label: label,
            value: value,
            id: id
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
      console.log("creating location");
      const {
        location,
        location: {
          title
        }
      } = this.state;
      console.log(location, title);
      const slug = slugify__WEBPACK_IMPORTED_MODULE_12___default()(title, {
        replacement: "-",
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
      location["slug"] = slug;
      input["data"] = location;
      console.log(input);
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
        input
      }, true);

      if (data) {
        return data.createLocation;
      }
    });

    _defineProperty(this, "handleInputChange", (event, property) => {
      console.log("handling on input chagne");
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState(prevState => {
        let stateFields;

        if (property === "location") {
          console.log("setting location state");
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
        if (this.state.photo.title && this.state.invalidFields.title) delete invalidFields["title"];
        stateFields["invalidFields"] = invalidFields;
        return stateFields;
      });
    });

    _defineProperty(this, "removeImage", () => {
      console.log("remove");
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
            blob: "Selecteer een afbeelding kleiner dan 27MB."
          }
        }));
        return;
      } else {
        this.setState(prevState => {
          const invalidFields = { ...prevState.invalidFields
          };
          if (invalidFields.hasOwnProperty("blob")) delete invalidFields["blob"];
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

      let exifrGps = await exifr__WEBPACK_IMPORTED_MODULE_4___default.a.gps(file);
      let output = await exifr__WEBPACK_IMPORTED_MODULE_4___default.a.parse(file, ["LensModel"]); // if the photo contains gps data

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
        exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getData(file, () => {
          let exifData = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.pretty(file);

          if (exifData && exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "ExposureTime") && exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "ISOSpeedRatings") && exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "FNumber")) {
            let date = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "DateTime");

            if (date) {
              let splittedDate = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "DateTime").substr(0, 10).split(":");
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

            const shutterVal = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "ExposureTime").numerator / exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "ExposureTime").denominator;
            let shutterspeedVal = shutterVal > 1 ? shutterVal : "1/" + 1 / shutterVal;
            let ISOVal = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "ISOSpeedRatings");
            let apertureVal = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "FNumber").numerator / exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "FNumber").denominator;
            let focalLengthVal = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "FocalLength") + "mm";
            let cameraVal = exif_js__WEBPACK_IMPORTED_MODULE_2___default.a.getTag(file, "Model");
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
                date: "",
                shutterspeed: "",
                iso: "",
                aperture: "",
                focalLength: "",
                camera: ""
              }
            }));
          }
        });
      } else {
        this.setState(prevState => ({ ...prevState,
          photo: { ...prevState.photo,
            date: "",
            shutterspeed: "",
            iso: "",
            aperture: "",
            focalLength: "",
            camera: ""
          }
        }));
      }
    });

    _defineProperty(this, "handleOnDrop", e => {
      console.log("handleOnDrop fired", e);
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
        slug.replace(previousSlug, "");
        const createdSuffix = "-" + suffix;
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

  componentDidUpdate(prevProps) {
    console.log("component updated", prevProps, this.props);
    const {
      value: {
        user: prevUser
      }
    } = prevProps;
    const {
      value: {
        user
      }
    } = this.props;

    if (prevUser !== user) {
      this.updateContext();
    }
  }

  updateContext() {
    this.setState(prevState => ({ ...prevState,
      photo: { ...prevState.photo,
        user: this.props.value.user.id
      }
    }));
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
    this.updateContext();
  }

  async handleSubmit(e) {
    console.log("submitted");
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
        console.log("no blob in state");
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: "Voeg je nog een foto toe? 📸"
          }
        }));
      }

      if (!title) {
        console.log("no title in state.photo");
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            title: "Wat is de titel van je foto? 📸"
          }
        }));
      }

      console.log("returning");
      return;
    }

    let createdLocation = null;

    if (newLocation) {
      createdLocation = await this.createLocation();
      console.log(createdLocation);
    } else {
      console.log("no new location found");
    } // check if slug is available, if not, add number


    let slug = slugify__WEBPACK_IMPORTED_MODULE_12___default()(title, {
      replacement: "-",
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
    input["data"] = this.state.photo;
    delete input.data.blob;
    delete input.data.longitude;
    delete input.data.latitude;
    console.log("input", input);
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      input
    }, true);

    if (data) {
      console.log("photo page created, uploading foto.."); //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
        //if the query returns an id in data, the photo is created
        // redirect to created photo
        this.props.redirect(data.createPhoto.photo.slug);
      };

      const formData = new FormData();
      const {
        blob: uploadedFile
      } = this.state;
      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append("ref", "photo");
      formData.append("field", "photo");
      formData.append("refId", data.createPhoto.photo.id);
      const request = new XMLHttpRequest();
      request.open("POST", `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      console.log("failed");
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
      className: "photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "my-2 font-bold"
    }, "Starpi Foto toevoegen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddPhoto_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
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
      findNearbyLocations: _components_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_15__["findNearbyLocations"],
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
        width: this.state.uploadPercentage + "%"
      }
    }, this.state.uploadPercentage + "%")), this.previousButton(), this.nextButton(disabled, btnClass)));
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
        console.log("updating position", marker.leafletElement.getLatLng());
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
      this.props.onChange(e, "location");
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
      console.log("mounting");
      const {
        locationKnown
      } = this.props.state;

      if (locationKnown) {
        console.log("location known");
        const {
          latitude,
          longitude
        } = this.props.state.photo;
        console.log("getting long lat", latitude, longitude);
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__["Map"], {
      className: "map",
      id: "photoLocation",
      center: position,
      zoom: zoom,
      ref: this.map
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__["Marker"], {
      position: position,
      ref: this.refmarker,
      draggable: this.state.draggable,
      onDragend: this.updatePosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_5__["Popup"], null, "Foto locatie"))), loadingNearbyLocations && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaSpinner"], null), nearbyLocations && !newLocation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: ""
    }, "Bedoel je misschien deze locatie?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-wrap -mx-2"
    }, nearbyLocations.map(location => location.photos.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCard_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_10___default.a, {
      components: animatedComponents,
      closeMenuOnSelect: false,
      isMulti: true,
      options: monthValues,
      placeholder: "Beste maand om te fotograferen",
      onChange: e => {
        this.props.handleSelect(e, "months");
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select_creatable__WEBPACK_IMPORTED_MODULE_9___default.a, {
      components: animatedComponents,
      isMulti: true,
      onChange: e => {
        this.props.handleSelect(e, "location_categories");
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
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */








class PhotoAddToLocation extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "redirect", slug => {
      //if the query returns an id in data, the photo is created
      // redirect to created photo
      const {
        history
      } = this.props;
      history.push({
        pathname: `/foto/${slug}`
      });
    });

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
  }

  // we are rendering the actual component to have access to the Context
  // outside of the renderfunction in the next component
  // We have to pass functions to make use of the router functionality
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_7__["userContext"].Consumer, null, value => {
      console.log(value);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MapElement, {
        value: value,
        redirect: this.redirect,
        fetchLocation: this.fetchLocation
      });
    });
  }

}

class MapElement extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "photoValidation", file => {
      if (file.size > 27000000) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: "Selecteer een afbeelding kleiner dan 27MB."
          }
        }));
        return;
      } else {
        this.setState(prevState => {
          const invalidFields = { ...prevState.invalidFields
          };
          if (invalidFields.hasOwnProperty("blob")) delete invalidFields["blob"];
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
      let output = await exifr__WEBPACK_IMPORTED_MODULE_4___default.a.parse(file, ["LensModel"]); // if the photo contains gps data

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
            let shutterspeedVal = shutterVal > 1 ? shutterVal : "1/" + 1 / shutterVal;
            let ISOVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "ISOSpeedRatings");
            let apertureVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FNumber").numerator / exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FNumber").denominator;
            let focalLengthVal = exif_js__WEBPACK_IMPORTED_MODULE_3___default.a.getTag(file, "FocalLength") + "mm";
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
                date: "",
                shutterspeed: "",
                iso: "",
                aperture: "",
                focalLength: "",
                camera: ""
              }
            }));
          }
        });
      } else {
        this.setState(prevState => ({ ...prevState,
          photo: { ...prevState.photo,
            date: "",
            shutterspeed: "",
            iso: "",
            aperture: "",
            focalLength: "",
            camera: ""
          }
        }));
      }
    });

    _defineProperty(this, "handleInputChange", (event, property) => {
      console.log("handling on input chagne");
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState(prevState => {
        let stateFields;

        if (property === "location") {
          console.log("setting location state");
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
        if (this.state.photo.title && this.state.invalidFields.title) delete invalidFields["title"];
        stateFields["invalidFields"] = invalidFields;
        return stateFields;
      });
    });

    _defineProperty(this, "removeImage", () => {
      console.log("remove");
      this.setState({
        tempFile: null,
        photo: {},
        blob: null,
        locationKnown: false
      });
    });

    _defineProperty(this, "handleOnDrop", e => {
      console.log("handleOnDrop fired", e);
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
        slug.replace(previousSlug, "");
        const createdSuffix = "-" + suffix;
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
    console.log(props);
  }

  componentDidUpdate(prevProps) {
    console.log("update");
    const {
      value: {
        user: prevUser
      }
    } = prevProps;
    const {
      value: {
        user
      }
    } = this.props;
    console.log(prevUser, user);

    if (prevUser !== user) {
      console.log("updating context");
      this.updateContext();
    }
  }

  updateContext() {
    this.setState(prevState => ({ ...prevState,
      photo: { ...prevState.photo,
        user: this.props.value.user.id
      }
    }));
  }

  async componentDidMount() {
    console.log(this.props.value);
    const data = await this.props.fetchLocation();

    if (data) {
      console.log("props from mount", this.props);
      this.setState({
        location: data.location,
        photo: {
          location: data.location.id,
          user: this.props.value.id
        }
      });
    } else {
      this.setState({
        location: null
      });
    }
  }

  async handleSubmit(e) {
    console.log("submitted");
    e.preventDefault();
    e.persist();
    updateContext();
    const {
      blob,
      newLocation,
      photo: {
        title
      }
    } = this.state; // check if an image is given, and title, if not show error and return null;

    if (!blob || !title) {
      if (!blob) {
        console.log("no blob in state");
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: "Voeg je nog een foto toe? 📸"
          }
        }));
      }

      if (!title) {
        console.log("no title in state.photo");
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            title: "Wat is de titel van je foto? 📸"
          }
        }));
      }

      console.log("returning");
      return;
    } // check if slug is available, if not, add number


    let slug = slugify__WEBPACK_IMPORTED_MODULE_5___default()(title, {
      replacement: "-",
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
    input["data"] = this.state.photo;
    delete input.data.blob;
    delete input.data.longitude;
    delete input.data.latitude;
    console.log("input", input);
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      input
    }, true);

    if (data) {
      console.log("photo page created, uploading foto.."); //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
        //if the query returns an id in data, the photo is created
        // redirect to created photo
        this.props.redirect(data.createPhoto.photo.slug);
      };

      const formData = new FormData();
      const {
        blob: uploadedFile
      } = this.state;
      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append("ref", "photo");
      formData.append("field", "photo");
      formData.append("refId", data.createPhoto.photo.id);
      const request = new XMLHttpRequest();
      request.open("POST", `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      console.log("failed");
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
      className: "photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
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
/*! exports provided: PhotoView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoView", function() { return PhotoView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoCarousel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_cg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/cg */ "react-icons/cg");
/* harmony import */ var react_icons_cg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_cg__WEBPACK_IMPORTED_MODULE_2__);
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
    className: "w-full inline-block my-2 mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoCard rounded relative shadow-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative rounded overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: selectedLocation,
    className: "absolute w-full h-full z-10",
    title: "Bekijk foto nu"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: photo.photo[0].url,
    className: "object-cover  w-full h-48  block",
    alt: "Foto"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoContent pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-black"
  }, // convert date type to a readable date string
  photo.date && photo.date.toDateString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoInfo flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-black"
  }, photo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-black"
  }, photo.location.title)), deletePhoto != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: deletePhoto != null && (() => {
      if (window.confirm("Weet je zeker dat je deze foto wilt verwijderen?")) deletePhoto(index);
    }),
    className: "rounded w-8 h-8 bg-red-700 ml-auto flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_cg__WEBPACK_IMPORTED_MODULE_2__["CgTrash"], {
    className: "w-4 h-4 stroke-current text-white"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear"
  }))));
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
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _components_favButton_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/favButton.jsx */ "./src/components/favButton.jsx");
/* harmony import */ var _components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var _components_Comments_Comments_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Comments/Comments.jsx */ "./src/components/Comments/Comments.jsx");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/go */ "react-icons/go");
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_icons_go__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/CreateNotification.jsx */ "./src/components/CreateNotification.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */

/* eslint "react/jsx-no-undef":"off" */
















class PhotoDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photoBySlug($slug: String!){
                    photoBySlug(slug: $slug) {
                      id
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
                      comments {
                        id
                        body
                        parent {
                          id
                        }
                        user {
                          profilePicture {
                            url
                          }
                          slug
                          username 
                          firstname
                          lastname
                        }
                      }
                      likes
                      focalLength
                      usersLike {
                        id
                      }
                      location {
                          longitude
                          latitude
                          id
                          title
                          slug
                      }
                      user {
                        id
                        slug
                        username
                        profilePicture {
                          url
                        }
                      }
                    }
                  }`;
    let {
      params: {
        id: slug
      }
    } = match;
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    console.log(result);
    return result;
  }

  constructor() {
    super();

    _defineProperty(this, "updateFav", async (user, likedId, action, receiver) => {
      // TODO: store user.likedPhotos in state, and map favArray from state instead of user object
      // problem: user.likedPhotos is not updated
      const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            likedPhotos {
              id
            }
          }
        }
      }`;
      let favArray = user.likedPhotos.map(fav => fav.id);

      if (action === "add") {
        if (!favArray.includes(likedId)) {
          favArray.push(likedId);
          await Object(_components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_14__["default"])(user.id, receiver, "like", likedId);
        } else {
          // already in favourites
          return;
        }
      } else if (action === "remove") {
        if (favArray.includes(likedId)) {
          // likedId is in array, so remove it from array
          const index = favArray.indexOf(likedId);

          if (index > -1) {
            favArray.splice(index, 1);
          }
        } else {
          // not in favourites
          return;
        }
      }

      const variables = {
        input: {
          where: {
            id: user.id
          },
          data: {
            likedPhotos: favArray
          }
        }
      };
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true);
    });

    _defineProperty(this, "addComment", async (data, receiver) => {
      console.log(data, receiver);
      const query = `mutation createPhotoComment($input: createPhotoCommentInput){
      createPhotoComment(
        input: $input
      ) {
        photoComment {
          body
          id
          parent {
            id
          }
          user {
            id
            firstname
            lastname
            profilePicture {
              url
            }
            slug
            username
          }
        }
      }
    }`;
      let input = {
        input: data
      };
      console.log(input);
      const response = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, input, true, true);
      console.log(response);

      if (response) {
        if (!response.errors) {
          await Object(_components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_14__["default"])(data.data.user, receiver, "comment", data.data.photo);
          let _comments = [...this.state.photoBySlug.comments];

          _comments.push({
            body: response.createPhotoComment.photoComment.body,
            id: response.createPhotoComment.photoComment.id,
            parent: response.createPhotoComment.photoComment.parent,
            user: response.createPhotoComment.photoComment.user
          });

          this.setState(prevState => ({
            photoBySlug: { ...prevState.photoBySlug,
              comments: _comments
            }
          }));
        } else {
          console.log("an error happened");
        }
      }
    });

    const photoBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.photoBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      isServer: true,
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
      console.log("Your current position is:");
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
      fetch("https://ipapi.co/json").then(res => res.json()).then(location => {
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
    this.setState({
      isServer: false
    });
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables

    const data = await PhotoDetailStrapi.fetchData(match);

    if (data.photoBySlug != null) {
      this.setState({
        photoBySlug: data.photoBySlug
      });
    } else {
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    const {
      photoBySlug,
      redirect,
      isServer
    } = this.state;

    if (redirect) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/niet-gevonden"
      });
    }

    if (photoBySlug === null) {
      return null;
    } else {
      console.log(photoBySlug);
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full flex flex-col justify-center items-center relative bg-black",
      style: {
        height: "80vh"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "px-6 py-6 h-full w-full object-contain",
      src: photoBySlug.photo[0].url,
      alt: photoBySlug.title
    }), !isServer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "absolute right-0 bottom-0 m-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_8__["userContext"].Consumer, null, value => {
      if (value.user) {
        if (value.user.id === photoBySlug.user.id) {
          return;
        }

        let favourite;

        if (value.user && photoBySlug.usersLike.filter(favourites => favourites.id === value.user.id).length > 0) {
          favourite = true;
        } else {
          favourite = false;
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_favButton_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
          favourite: favourite,
          updateFav: this.updateFav,
          user: value.user,
          likedId: photoBySlug.id,
          addTitle: "Toevoegen aan favorieten",
          removeTitle: "Verwijderen uit favorieten",
          receiver: photoBySlug.user.id
        });
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container mx-auto sm:mt-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block sm:flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "w-full sm:mr-6 md:mr-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-2xl font-bold mb-1 text-gray-800 block"
    }, photoBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-gray-600 mb-6"
    }, photoBySlug.desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Comments_Comments_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
      comments: photoBySlug.comments,
      photoId: photoBySlug.id,
      addComment: this.addComment,
      receiver: photoBySlug.user.id
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "relative block sm:flex sm:items-center sm:w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      className: "top-0 left-0 h-full w-full absolute",
      to: `/fotograaf/${photoBySlug.user.slug}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx-auto sm:mx-0 mb-2 sm:mr-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
      profile: photoBySlug.user
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl leading-tight"
    }, photoBySlug.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "my-4"
    }, photoBySlug.camera && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center mb-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__["IoCameraOutline"], {
      className: "text-2xl"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, photoBySlug.camera)), (photoBySlug.focalLength || photoBySlug.aperture || photoBySlug.iso || photoBySlug.shutterspeed) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_go__WEBPACK_IMPORTED_MODULE_13__["GoSettings"], {
      className: "text-2xl"
    })), photoBySlug.focalLength && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, photoBySlug.focalLength), photoBySlug.aperture && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, photoBySlug.aperture), photoBySlug.iso && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, photoBySlug.iso), photoBySlug.shutterspeed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-2"
    }, photoBySlug.shutterspeed))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: `/fotolocatie/${photoBySlug.location.slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, photoBySlug.location.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie"))))))));
  }

}

/***/ }),

/***/ "./src/Profile.jsx":
/*!*************************!*\
  !*** ./src/Profile.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/md */ "react-icons/md");
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/ti */ "react-icons/ti");
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_ti__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PhotoCarousel.jsx */ "./src/PhotoCarousel.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_followButton_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/followButton.jsx */ "./src/components/followButton.jsx");
/* harmony import */ var _components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var _components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/CreateNotification.jsx */ "./src/components/CreateNotification.jsx");
/* harmony import */ var _components_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/LocationCards.jsx */ "./src/components/LocationCards.jsx");
















const UserProfile = props => {
  const [profile, setProfile] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["useHistory"])();

  const getInitialProfile = async props => {
    let _profile = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_profile) {
      _profile = await UserProfile.fetchData(props.match);
    }

    setProfile(_profile);
  };

  const getProfile = async () => {
    const _profile = await UserProfile.fetchData(props.match);

    setProfile(_profile);
  };

  Object(_components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_10__["default"])(() => {
    getInitialProfile(props);
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getProfile();
  }, [props]);

  const updateFollow = async followId => {
    //console.log(followId);
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            followers {
              id
            }
          }
        }
      }`;
    let profileFollowersArray = profile.followers.map(following => following.id); //console.log("before adjusting", profileFollowersArray);

    let action; // if the id that is being followed is not already in the array, add it

    if (!profileFollowersArray.includes(followId)) {
      profileFollowersArray.push(followId);
      action = "add";
    } else if (profileFollowersArray.includes(followId)) {
      // followId is in array, so remove it from array
      const index = profileFollowersArray.indexOf(followId);

      if (index > -1) {
        profileFollowersArray.splice(index, 1);
      }

      action = "remove";
    } //console.log("after adjusting", profileFollowersArray);


    const variables = {
      input: {
        where: {
          id: profile.id
        },
        data: {
          followers: profileFollowersArray
        }
      }
    };
    let prevProfile = { ...profile
    };
    let _profile = { ...profile
    };
    let newFollowArray = profileFollowersArray.map(following => {
      return {
        id: following
      };
    });
    _profile.followers = newFollowArray;
    setProfile(_profile);
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true, true);

    if (data) {
      if (data.errors) {
        console.log("an error happened");
        setProfile(prevProfile);
      } else {
        if (action === "add") {
          await Object(_components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_12__["default"])(followId, profile.id, "follow");
        }
      }
    }
  };

  const deletePhoto = async index => {
    const query = `mutation photoDelete($input:deletePhotoInput) {
      deletePhoto(input: $input) {
        photo {
          id
        }
      }
    }`;
    const prevProfile = { ...profile
    };
    const {
      photos
    } = profile;
    const newList = [...photos];
    newList.splice(index, 1);
    const _profile = { ...profile
    };
    _profile.photos = newList;
    setProfile(_profile); // get the id of the photo to be deleted

    const {
      id
    } = photos[index];
    const variables = {
      input: {
        where: {
          id
        }
      }
    }; // execute the query

    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true, true);

    if (data) {
      if (data.errors) {
        console.log("an error happened");
        setProfile(prevProfile);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_6__["userContext"].Consumer, null, value => {
    //console.log("value", value);
    if (value.user) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfileComponent, {
        curUser: value.user,
        profile: profile,
        updateFollow: updateFollow,
        deletePhoto: deletePhoto
      });
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfileComponent, {
        curUser: null,
        profile: profile,
        updateFollow: updateFollow,
        deletePhoto: deletePhoto
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

UserProfile.fetchData = async (match, search, showError) => {
  console.log(match);
  const query = `query profile($slug: String!) {
          users( where: { slug: $slug } ) {
            username
            profilePicture {
              url
            }
            email
            id
            slug
            location
            followers{
              id
            }
            followings {
              id
            }
            favouriteLocations {
              id
              title
              slug
              location_categories {
                id
                label
              }
              photos {
                likes
                photo {
                  url
                  
                }
              }
            }
            photos {
              likes
              id
              title
              slug
              location {
                longitude
                latitude
                id
                title
                slug
              }
              photo {
                id
                name
                url
              }
            }
          }
        }`;
  let {
    params: {
      slug
    }
  } = match;
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
    slug
  }, true);
  return result.users[0];
};

const UserProfileComponent = props => {
  const {
    curUser,
    profile,
    updateFollow,
    deletePhoto
  } = props;

  if (profile === null) {
    console.log("return null from render");
    return null;
  }

  const [isServer, setIsServer] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setIsServer(false);
  }, []); //console.log("curUser", props);

  const followCount = profile.followers.length;
  console.log("userProfileComponent rendered again, followCount: ", followCount, profile);
  const filterResult = curUser && profile.followers.filter(followers => followers.id === curUser.id); //console.log(filterResult);

  const followsUser = curUser ? profile.followers.filter(followers => followers.id === curUser.id).length > 0 : 0;
  let numberOfLikes = 0;

  if (profile.photos.length > 0) {
    for (let i = 0; i < profile.photos.length; i++) {
      numberOfLikes = numberOfLikes + profile.photos[i].likes;
    }
  }

  console.log(profile);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:flex sm:items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex sm:items-center sm:w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mx-auto sm:mx-0 mb-2 sm:mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
    profile: profile
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl leading-tight text-center sm:text-left"
  }, profile.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "flex items-center text-gray-400 text-sm text-center justify-center sm:justify-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ti__WEBPACK_IMPORTED_MODULE_5__["TiLocation"], null), "\xA0", profile.location)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hidden sm:block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-between sm:justify-start mt-2 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, followCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, followCount === 1 ? "volger" : "volgers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, profile.followings.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "volgend")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, numberOfLikes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "likes")))))), !isServer && curUser && curUser.id !== profile.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_followButton_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
    follow: followsUser,
    updateFollow: updateFollow,
    followId: curUser.id
  }), !isServer && curUser && curUser.id === profile.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
    to: `/profiel/bewerken/${profile.slug}`,
    className: "ml-auto my-1 rounded bg-blue-500 hover:bg-blue-600 text-white p-1 sm:p-3 text-xl flex justify-center items-center editProfile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_4__["MdEdit"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-between mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, followCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, followCount === 1 ? "volger" : "volgers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, profile.followings.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "volgend")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, numberOfLikes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "likes"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "my-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "my-3"
  }, "Foto's"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
  }, profile.photos.map((photo, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_7__["PhotoView"], {
    key: photo.id,
    index: index,
    deletePhoto: !isServer && curUser && curUser.id === profile.id ? deletePhoto : null,
    photo: photo
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "my-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    id: "fav",
    className: "my-3"
  }, "Favoriete locaties"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
  }, profile.favouriteLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
    key: location.id,
    location: location
  })))));
};

/***/ }),

/***/ "./src/ProfileEdit.jsx":
/*!*****************************!*\
  !*** ./src/ProfileEdit.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Form_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Form.jsx */ "./src/Form.jsx");
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/ai */ "react-icons/ai");
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_ai__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_7__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class dataEdit extends _Form_jsx__WEBPACK_IMPORTED_MODULE_4__["default"] {
  static async fetchData(match, search, showError) {
    console.log(match);
    const query = `query data($slug: String!) {
            users( where: { slug: $slug } ) {
              username
			        email
              id
              firstname
              lastname
              location
              profilePicture {
                url
              }
            }
          }`;
    let {
      params: {
        slug
      }
    } = match;
    console.log(slug);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    console.log(result);
    return result;
  }

  componentDidMount() {
    const {
      data
    } = this.state;

    if (data === null) {
      this.loadData();
    }
  }

  constructor() {
    super();

    _defineProperty(this, "schema", {
      email: _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default.a.string().email({
        tlds: {
          allow: false
        }
      }).required().messages({
        "string.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`,
        "any.invalid": `Dit email adres is al ingebruik.`
      }),
      firstname: _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default.a.string().required().messages({
        "string.empty": `Vul je je voornaam nog even in? 😉`,
        "any.required": `Vul je je voornaam nog even in? 😉`
      }),
      lastname: _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default.a.string().required().messages({
        "string.empty": `Vul je je achternaam nog even in? 😉`,
        "any.required": `Vul je je achternaam nog even in? 😉`
      }),
      username: _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default.a.string().regex(/^\S*$/).required().messages({
        "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
        "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
        "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten"
      }),
      location: _hapi_joi__WEBPACK_IMPORTED_MODULE_6___default.a.string()
    });

    _defineProperty(this, "uploadFile", (file, redirect, newSlug) => {
      const formData = new FormData();
      formData.append(`files`, file, file.name);
      formData.append("ref", "user");
      formData.append("source", "users-permissions"); // Plugin name.

      formData.append("field", "profilePicture");
      formData.append("refId", this.state.data.id);
      const request = new XMLHttpRequest();
      request.open("POST", `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect(newSlug));
    });

    _defineProperty(this, "photoValidation", file => {
      if (file.size > 27000000) {
        this.setState(prevState => ({ ...prevState,
          invalidFields: { ...prevState.invalidFields,
            blob: "Selecteer een afbeelding kleiner dan 27MB."
          }
        }));
        return;
      } else {
        this.setState(prevState => {
          const invalidFields = { ...prevState.invalidFields
          };
          if (invalidFields.hasOwnProperty("blob")) delete invalidFields["blob"];
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
    });

    _defineProperty(this, "removeImage", () => {
      console.log("remove");
      this.setState({
        tempFile: null,
        photo: {},
        blob: null
      });
    });

    console.log("store: ", _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData);
    const data = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData.users[0] : null;
    console.log("data: ", data);
    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;
    this.state = {
      data,
      errors: {},
      photoLoading: false,
      tempFile: null,
      saving: false
    };
    this.fileInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    const {
      match: {
        params: {
          slug: prevSlug
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          slug
        }
      }
    } = this.props;

    if (prevSlug !== slug) {
      this.loadData();
    }
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables

    const data = await dataEdit.fetchData(match);
    console.log("loaded data: ", data);

    if (data) {
      this.setState({
        data: data.users[0]
      });
    }
  }

  async doSubmit(e) {
    this.setState({
      saving: true
    });
    const {
      blob: uploadedFile,
      data: {
        username,
        id: userId
      }
    } = this.state;

    const redirect = slug => {
      //if the query returns an id in data, the photo is created
      // redirect to created photo
      const doRedirect = () => {
        const {
          history
        } = this.props;
        history.push({
          pathname: `/fotograaf/${slug}`
        });
      };

      setTimeout(doRedirect, 2000); //window.location = `/fotograaf/${slug}`;
    }; // update the fields


    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            slug
          }
        }
      }`;
    const variables = {
      input: {
        where: {
          id: userId
        },
        data: { ...this.state.data
        }
      }
    };
    delete variables.input.data.profilePicture;
    delete variables.input.data.id;
    variables.input.data.slug = slugify__WEBPACK_IMPORTED_MODULE_7___default()(username, {
      replacement: "-",
      // replace spaces with replacement character, defaults to `-`
      remove: undefined,
      // remove characters that match regex, defaults to `undefined`
      lower: true,
      // convert to lower case, defaults to `false`
      strict: true // strip special characters except replacement, defaults to `false`

    });
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true);

    if (data.updateUser) {
      if (uploadedFile !== null && uploadedFile !== undefined) {
        console.log("in upload file");
        this.uploadFile(uploadedFile, redirect, data.updateUser.user.slug);
      } else {
        console.log("straight to redirect");
        redirect(data.updateUser.user.slug);
      }
    }
  }

  render() {
    const {
      data,
      photoLoading,
      tempFile
    } = this.state;

    if (data === null) {
      console.log("return null from render");
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      name: "profileEdit",
      encType: "multipart/form-data",
      onSubmit: this.handleSubmit
    }, photoLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_5__["AiOutlineLoading3Quarters"], {
      className: "fill-current text-green-500"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-col justify-center items-center mb-4 relative cursor-pointer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "file",
      name: "blob",
      ref: this.fileInput,
      onChange: this.onFileChange,
      onDrop: this.handleOnDrop,
      onDragOver: this.handleOnDragOver,
      onDragLeave: this.handleOnDragLeave,
      className: "absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
    }), tempFile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "imagePreview",
      className: "relative h-16 w-16 overflow-hidden rounded-full mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: tempFile,
      id: "output_image",
      className: "w-auto h-16 rounded-full mb-2"
    })) : data.profilePicture !== null && data.profilePicture !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "imagePreview",
      className: "relative h-16 w-16 overflow-hidden rounded-full mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "w-auto h-16 rounded-full mb-2",
      src: data.profilePicture.url
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "fill-current h-16 w-16 mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaUserSecret"], {
      className: "text-2xl"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "font-bold text-blue-500"
    }, "Profielfoto veranderen")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex flex-col w-full"
    }, this.renderInput("username", "Gebruikersnaam", "Gebruikersnaam", "text"), this.renderInput("email", "Email", "Email", "text"), this.renderInput("firstname", "Voornaam", "Voornaam", "text"), this.renderInput("lastname", "Achternaam", "Achternaam", "text"), this.renderInput("location", "Woonplaats", "Woonplaats", "text")), this.renderButton("Profiel opslaan", this.state.saving)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (dataEdit);

/***/ }),

/***/ "./src/RegisterHooks.jsx":
/*!*******************************!*\
  !*** ./src/RegisterHooks.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");









const RegisterForm = () => {
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [errors, setErrors] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const schema = {
    email: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email({
      tlds: {
        allow: false
      }
    }).required().messages({
      "string.empty": `Vul je je email nog even in? 😉`,
      "any.required": `Vul je je email nog even in? 😉`,
      "string.email": `Vul je een geldig adres in? 😉`,
      "any.invalid": `Dit email adres is al ingebruik.`
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
  };

  const doSubmit = () => {
    // call server
    // redirect user to homepage
    createUser();
  };

  const renderButton = (label, disable = false) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" + (validate() || Object.keys(errors).length !== 0 || disable ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: validate() || Object.keys(errors).length !== 0 || disable
    }, disable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaSpinner"], {
      className: "animate-spin"
    }) : label);
  };

  const handleChange = ({
    currentTarget: input
  }) => {
    const _errors = { ...errors
    };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;else delete _errors[input.name];
    const _data = { ...data
    };
    _data[input.name] = input.value;
    setData(_data);
    setErrors(_errors); // setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const renderInput = (name, label, placeholder, type = "text", classes = "w-full", onBlur = () => {}) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name] || "",
      onChange: handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type,
      onBlur: onBlur
    });
  };

  const onInputBlur = async type => {
    // get the email entered
    const value = data[type]; // do a query to db to check if email is available

    let valueObj = {};
    valueObj[type] = value;
    const available = await _services_authService__WEBPACK_IMPORTED_MODULE_3__["default"].checkAvailability(type, valueObj); // if email already exists, add error to email

    if (!available) {
      const _errors = { ...errors
      };
      const errorMessage = `${type.charAt(0).toUpperCase() + type.slice(1)} is al in gebruik.`;
      _errors[type] = errorMessage;
      setErrors(_errors); // else, email doesnt exists, validate property if there is a correct email and set errors if they exist
    } else {
      const _errors = { ...errors
      };
      const errorMessage = validateProperty({
        name: type,
        value: value
      });
      if (errorMessage) _errors[type] = errorMessage;else delete _errors[type];
      setErrors(_errors);
    }
  };

  const validateProperty = ({
    name,
    value
  }) => {
    console.log(name, value);
    const object = {
      [name]: value
    };
    console.log(schema);

    const _schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
      [name]: schema[name]
    });

    const result = _schema.validate(object);

    console.log(result);
    const error = result.error;
    console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const createUser = async () => {
    let input = { ...data
    };
    input["role"] = "5eef1a60e3b96d29e2d1d1ac"; // check if slug is available, if not, add number

    input["slug"] = slugify__WEBPACK_IMPORTED_MODULE_5___default()(input.username, {
      replacement: "-",
      // replace spaces with replacement character, defaults to `-`
      remove: undefined,
      // remove characters that match regex, defaults to `undefined`
      lower: true,
      // convert to lower case, defaults to `false`
      strict: true // strip special characters except replacement, defaults to `false`

    });
    console.log({
      input: input
    });
    const registered = await _services_authService__WEBPACK_IMPORTED_MODULE_3__["default"].register({
      input: input
    });

    if (registered === true) {
      window.location = "/";
    } else {
      console.log(registered);
    }
  };

  const validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true
    };
    const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...schema
    });
    const {
      error
    } = schema.validate(data, options);
    console.log(error);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit();
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit,
    className: "bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold mb-6 text-2xl text-green-500 text-center"
  }, "Welkom bij Spotshare"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "py-3 bg-blue-500 rounded text-white flex justify-center items-center hover:pointer hover:bg-blue-600",
    href: "https://d3bdf895b473.ngrok.io/connect/facebook"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaFacebook"], {
    className: "mr-2"
  }), " Registreer met Facebook"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex my-4 justify-center items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "w-full border-gray-400 mt-0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mx-4 text-center text-gray-500"
  }, "Of"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "w-full border-gray-400 mt-0"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex"
  }, renderInput("firstname", "Voornaam", "Voornaam", "text", "w-1/2 mr-2"), renderInput("lastname", "Achternaam", "Achternaam", "text", "w-1/2")), renderInput("username", "Gebruikersnaam", "Gebruikersnaam", "text", "w-full", () => {
    onInputBlur("username");
  }), renderInput("email", "Email", "Emailadres", "text", "w-full", () => {
    onInputBlur("email");
  }), renderInput("password", "Wachtwoord", "Vul je wachtwoord in", "password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between"
  }, renderButton("Kom bij de club!")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-center itemst-center w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-600 text-center text-sm mr-2 block"
  }, "Heb je al een account?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    className: "block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600",
    to: "/inloggen"
  }, "Inloggen"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full h-full",
    style: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
      backgroundSize: `cover`,
      backgroundPosition: `center center`
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (RegisterForm);

/***/ }),

/***/ "./src/components/CategorySearch/LocationsPerCategorie.jsx":
/*!*****************************************************************!*\
  !*** ./src/components/CategorySearch/LocationsPerCategorie.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Results/ResultMap.jsx */ "./src/components/Results/ResultMap.jsx");
/* harmony import */ var _Results_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Results/CategorieFilter.jsx */ "./src/components/Results/CategorieFilter.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Results/LocationList.jsx */ "./src/components/Results/LocationList.jsx");


/* to support IE */









const LocationsPerCategorie = props => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [filteredLocations, setFilteredLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [selectedLocation, setSelectedLocation] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showMap, setShowMap] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  let location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useLocation"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    !locations && getLocations();

    const _activeFilter = getActiveFilter();

    if (locations) {
      const _filteredLocations = locations.filter(location => {
        const include = location.location_categories.filter(categorie => {
          if (categorie.id === _activeFilter) {
            return true;
          } else {
            return false;
          }
        }); //console.log(location.id, include);

        if (include.length > 0) return true;
      });

      setFilteredLocations(_filteredLocations);
    } //console.log(_filteredLocations);

  }, [location]);

  const getLocations = async () => {
    let _locations = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    console.log(_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData, _locations);
    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_locations) {
      console.log("getting locations");
      _locations = await LocationsPerCategorie.fetchData(props.match, location.search);
    }

    setLocations(_locations.filter(location => location.photos.length > 0));
    console.log(_locations);
  };

  const getActiveFilter = () => {
    const params = new URLSearchParams(location.search);

    const _activeFilter = params.get("categorie") ? params.get("categorie") : "";

    if (_activeFilter) {
      return _activeFilter;
    } else {
      return false;
    }
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])(() => {
    const _activeFilter = getActiveFilter();

    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    }

    getLocations();
    setShowMap(true);
  });

  const selectLocation = locationId => {
    setSelectedLocation(locationId);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative h-screen"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full p-4 h-screen overflow-scroll"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Resultaten"), locations && (filteredLocations.length > 0 ? filteredLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))) : locations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-10 w-full h-full"
  }, showMap && locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: filteredLocations,
    selectLocation: selectLocation,
    active: selectedLocation
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: locations,
    selectLocation: selectLocation,
    active: selectedLocation
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsPerCategorie);

LocationsPerCategorie.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility
  console.log(match);
  let {
    params: {
      value
    }
  } = match;
  console.log(value);
  const query = `query locationCategorie($value:String!){
    locationCategories(where:{value: $value}) {
      label
    value
    locations {
      id
      title
      longitude
      latitude
      slug
      location_categories {
        label
        value
        locations {
          title
        }
      }
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
  }
  }`;
  const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__["default"])(query, {
    value
  }, true);

  if (data) {
    console.log(data.locationCategories[0].locations);
  }

  return data.locationCategories[0].locations; // const params = new URLSearchParams(search);
  // console.log("fetching data");
  // const vars = {};
  // if (params.get("lat")) vars.lat = params.get("lat");
  // if (params.get("lng")) vars.lng = params.get("lng");
  // //vars.cat = params.get("categorie") ? params.get("categorie") : "";
  // console.log(vars);
  // const _locations = await findNearbyLocations(vars.lat, vars.lng);
  // console.log(_locations);
  // return _locations;
};

/***/ }),

/***/ "./src/components/Comments/Comments.jsx":
/*!**********************************************!*\
  !*** ./src/components/Comments/Comments.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RecursiveComment_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecursiveComment.jsx */ "./src/components/Comments/RecursiveComment.jsx");
/* harmony import */ var _ReplyBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReplyBox.jsx */ "./src/components/Comments/ReplyBox.jsx");




const PhotoComment = ({
  comments,
  photoId,
  addComment,
  receiver
}) => {
  const [unflattenedComments, setUnflattenedComments] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setUnflattenedComments(unflatten(comments));
  }, [comments]);

  const unflatten = arr => {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem; // First map the nodes of the array to an object -> create a hash table.

    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]["children"] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id]; // If the element is not at the root level, add it to its parent array of children.

        if (mappedElem.parent) {
          mappedArr[mappedElem.parent.id]["children"].push(mappedElem);
        } // If the element is at the root level, add it to first level elements array.
        else {
            tree.unshift(mappedElem);
          }
      }
    }

    return tree;
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReplyBox_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    photoId: photoId,
    addComment: addComment,
    receiver: receiver
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, unflattenedComments.length ? unflattenedComments.map((item, idx) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RecursiveComment_jsx__WEBPACK_IMPORTED_MODULE_1__["Comment"], {
      item: item,
      key: idx,
      photoId: photoId,
      addComment: addComment,
      receiver: receiver
    });
  }) : ""));
};

/* harmony default export */ __webpack_exports__["default"] = (PhotoComment);

/***/ }),

/***/ "./src/components/Comments/RecursiveComment.jsx":
/*!******************************************************!*\
  !*** ./src/components/Comments/RecursiveComment.jsx ***!
  \******************************************************/
/*! exports provided: Comment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return Comment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReplyBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReplyBox.jsx */ "./src/components/Comments/ReplyBox.jsx");



const Comment = ({
  item,
  idx,
  photoId,
  addComment,
  receiver
}) => {
  const [showReplyBox, setShowReplyBox] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const replyClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  const closeReplyBox = () => {
    setShowReplyBox(false);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    key: idx
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "comment mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex"
  }, item.user.profilePicture !== null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: item.user.profilePicture.url,
    className: "rounded-full w-12 h-12 mr-4"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "imagePreview",
    className: "relative h-12 w-12 overflow-hidden rounded-full mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "fill-current h-12 w-12  mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaUserSecret"], {
    className: "text-2xl"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rounded px-3 py-2 bg-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, item.body), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block text-blue-500 text-xs cursor-pointer",
    onClick: replyClick
  }, "Beantwoorden"))), showReplyBox ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReplyBox_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    replyTo: item.id,
    photoId: photoId,
    addComment: addComment,
    closeBoxHandler: closeReplyBox,
    receiver: receiver
  }) : null), item.children && item.children.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-10 mt-2"
  }, item.children.map((item, idx) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comment, {
      item: item,
      key: idx,
      photoId: photoId,
      addComment: addComment,
      receiver: receiver
    });
  }))));
};

/***/ }),

/***/ "./src/components/Comments/ReplyBox.jsx":
/*!**********************************************!*\
  !*** ./src/components/Comments/ReplyBox.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);




const ReplyBox = ({
  replyTo = null,
  photoId,
  addComment,
  closeBoxHandler,
  receiver
}) => {
  const [commentValue, setCommentValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");

  const onChange = event => setCommentValue(event.target.value);

  const post = userId => {
    const data = {
      body: commentValue,
      photo: photoId,
      user: userId,
      parent: replyTo
    };
    let input = {};
    input["data"] = data;
    addComment(input, receiver);
    closeBoxHandler && closeBoxHandler();
    setCommentValue("");
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_1__["userContext"].Consumer, null, value => {
    if (value.user) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "flex mb-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "w-full"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "flex flex-wrap -mx-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "px-4 pt-3 pb-2 text-gray-800 text-lg"
      }, "Reactie plaatsen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "w-full md:w-full px-3 mb-2 mt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white",
        name: "body",
        placeholder: "Je bericht",
        required: true,
        value: commentValue,
        onChange: onChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "w-full md:w-full flex items-start md:w-full px-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "-mr-1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        className: "bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100",
        value: "Plaatsen",
        onClick: () => {
          post(value.user.id);
        }
      }))))));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-4 mt-4 mb-6 bg-blue-100 rounded border border-blue-200 text-blue-400"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: "/inloggen",
        className: "font-bold text-blue-400 hover:text-blue-500"
      }, "Login"), " ", "om een reactie te plaatsen");
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ReplyBox);

/***/ }),

/***/ "./src/components/ConstructorHook.jsx":
/*!********************************************!*\
  !*** ./src/components/ConstructorHook.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

/* harmony default export */ __webpack_exports__["default"] = (useConstructor);

/***/ }),

/***/ "./src/components/CreateNotification.jsx":
/*!***********************************************!*\
  !*** ./src/components/CreateNotification.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _graphQLFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphQLFetch */ "./src/graphQLFetch.js");


const CreateNotification = async (giver, receiver, action, photo) => {
  const query = `mutation createNotification($input:createNotificationInput!) {
        createNotification(input:$input) {
          notification {
            id
          }
        }
      }`;
  let input = {
    data: {}
  };
  input.data.giver = giver;
  input.data.receiver = receiver;
  input.data.action = action;
  if (photo) input.data.photo = photo;
  const result = await Object(_graphQLFetch__WEBPACK_IMPORTED_MODULE_0__["default"])(query, {
    input
  }, true);
};

/* harmony default export */ __webpack_exports__["default"] = (CreateNotification);

/***/ }),

/***/ "./src/components/Dashboard/CategorieList.jsx":
/*!****************************************************!*\
  !*** ./src/components/Dashboard/CategorieList.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);




const CategorieList = ({
  categories
}) => {
  console.log(categories);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-black mb-2"
  }, "Zoek locatie op categorie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap"
  }, categories && categories.filter(categorie => categorie.value != "").map(categorie => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategorieLabel, {
    categorie: categorie,
    key: categorie.value
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (CategorieList);

const CategorieLabel = ({
  categorie: {
    label,
    value
  }
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: `/fotolocaties/categorie/${value}`,
    className: "block py-2 px-4 rounded-full mr-2 mb-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500"
  }, label);
};

/***/ }),

/***/ "./src/components/Dashboard/Dashboard.jsx":
/*!************************************************!*\
  !*** ./src/components/Dashboard/Dashboard.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Heading_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Heading.jsx */ "./src/components/Dashboard/Heading.jsx");
/* harmony import */ var _LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationsNearby.jsx */ "./src/components/Dashboard/LocationsNearby.jsx");
/* harmony import */ var _CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategorieList.jsx */ "./src/components/Dashboard/CategorieList.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MostRecent.jsx */ "./src/components/Dashboard/MostRecent.jsx");
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _NotificationBoard_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./NotificationBoard.jsx */ "./src/components/Dashboard/NotificationBoard.jsx");
















const Dashboard = props => {
  const [categories, setCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showNotifications, setShowNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["useRouteMatch"])();

  const getCategories = async () => {
    console.log({
      match
    });

    let _categories = _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData;

    if (!_categories) {
      _categories = await Dashboard.fetchData();
    }

    setCategories(_categories);
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__["default"])(() => {
    getCategories();
  });

  const redirect = slug => {
    props.history.push(slug);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_6__["userContext"].Consumer, null, value => {
    return !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
      to: "/"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block md:flex mt-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4 px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
      profile: value.user,
      size: 10
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl leading-tight text-center sm:text-left"
    }, value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "mt-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: `block py-3 flex items-center ${!showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaHome"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Dashboard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: `/fotograaf/${value.user.slug}#fav`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaBookmark"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Opgeslagen locaties"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: "/foto/toevoegen"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaPlus"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Foto uploaden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `block py-3 flex items-center ${showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__["IoNotifications"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Berichten"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center",
      to: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__["FiLogOut"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Uitloggen"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/2"
    }, showNotifications ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationBoard_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], {
      user: value.user
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      redirect: redirect
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4  px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      categories: categories
    }))));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Dashboard);

Dashboard.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query {
		locationCategories{
		  label
      value
      locations {
        id
      }
		}
	  }`;
  const vars = {};
  const {
    locationCategories: result
  } = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true); // only return categories with available locations

  return result.filter(cat => cat.locations.length > 0);
};

/***/ }),

/***/ "./src/components/Dashboard/Heading.jsx":
/*!**********************************************!*\
  !*** ./src/components/Dashboard/Heading.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_userContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/userContext */ "./src/services/userContext.js");
/* harmony import */ var _SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBox.jsx */ "./src/components/Dashboard/SearchBox.jsx");




const Heading = props => {
  const [greeting, setGreeting] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12) setGreeting("Goedemorgen");else if (hrs >= 12 && hrs <= 17) setGreeting("Goedemiddag");else if (hrs >= 17 && hrs <= 24) setGreeting("Goedenavond");
  }, []);

  const personalHeading = name => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-3xl mb-4"
  }, greeting, " ", name, "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Zoek je volgende ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-green-500"
  }, "fotolocatie"), "."));

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb-8 pt-6  text-center rounded bg-gray-900 mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext__WEBPACK_IMPORTED_MODULE_1__["userContext"].Consumer, null, value => !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, "De mooiste fotolocaties, gewoon bij jou in de buurt.") : personalHeading(value.user.firstname ? value.user.firstname : value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    redirect: props.redirect
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Heading);

/***/ }),

/***/ "./src/components/Dashboard/LocationsNearby.jsx":
/*!******************************************************!*\
  !*** ./src/components/Dashboard/LocationsNearby.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LocationCards.jsx */ "./src/components/LocationCards.jsx");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_5__);


 // Import Swiper React components





const LocationsNearby = () => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchData();
  }, []);

  const fetchData = async (match, search, showError) => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async pos => {
      console.log("succes");
      var crd = pos.coords;

      const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(crd.latitude, crd.longitude);

      setLocations(_locations);
    };

    const error = async err => {
      console.log("err");
      fetch("https://ipapi.co/json").then(res => res.json()).then(async location => {
        const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(location.latitude, location.longitude);

        console.log(location, _locations);
        setLocations(_locations);
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-black mb-4"
  }, "Locaties in de buurt"), locations && locations.map(location => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: location.id,
      className: `overflow-hidden relative rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out mb-4`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      className: "absolute w-full h-full top-0 left-0 z-10",
      to: `/fotolocatie/${location.slug}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: `block max-w-none w-20 h-20 object-cover mr-4`,
      src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
      alt: `Bekijk locatie ${location.title}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "text-black text-sm"
    }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__["LocationHashtag"], {
      key: category.id,
      category: category
    })))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsNearby);

/***/ }),

/***/ "./src/components/Dashboard/MostRecent.jsx":
/*!*************************************************!*\
  !*** ./src/components/Dashboard/MostRecent.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _SocialCard_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SocialCard.jsx */ "./src/components/Dashboard/SocialCard.jsx");






const MostRecent = () => {
  const [recentPhotos, setRecentPhotos] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();

  const getMostRecent = async () => {
    let _recentPhotos = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_recentPhotos) {
      _recentPhotos = await MostRecent.fetchData();
    }

    setRecentPhotos(_recentPhotos);
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
    getMostRecent();
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Meest Recent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, recentPhotos && recentPhotos.photos.map(photo => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SocialCard_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: photo.id,
      photo: photo
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (MostRecent);

MostRecent.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query recentPhotos{
    photos(limit: 6, sort:"createdAt:desc") {
createdAt
      title
      desc
      photo {
          url
      }

      comments {
        body
        user {
          profilePicture {
            url
          }
          slug
          username 
        }
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
usersLike {
id
}
      location {
          longitude
          latitude
          id
          title
          slug
      }
      user {
        id
        slug
        username
        firstname
        lastname
        profilePicture {
            url
          }
      }
    }
  }`;
  const vars = {};
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__["default"])(query, vars, true);
  return result;
};

/***/ }),

/***/ "./src/components/Dashboard/NotificationBoard.jsx":
/*!********************************************************!*\
  !*** ./src/components/Dashboard/NotificationBoard.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io */ "react-icons/io");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);






const NotificationBoard = ({
  user
}) => {
  const [notifications, setNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setNotifications(user.receivedNotifications);
  }, [user.receivedNotifications]);

  const deleteNotification = async id => {
    const oldNotifications = notifications;

    const _notifications = notifications.filter(notification => {
      return notification.id != id;
    });

    setNotifications(_notifications);
    const query = `mutation deleteNotification($id:ID!){
        deleteNotification(input: { where: { id: $id } }) {
          notification {
            id
          }
        }
      }`;
    let vars = {};
    vars.id = id;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__["default"])(query, vars, true);

    if (!data.deleteNotification.notification) {
      setNotifications(oldNotifications);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "py-6",
    id: "notifications"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-black pl-6"
  }, "Meldingen"), notifications && !notifications.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "my-2 px-6 py-4"
  }, "Er zijn geen notificaties voor je!") : notifications && notifications.map(notification => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Notification, {
      key: notification.id,
      notification: notification,
      onDeleteNotification: deleteNotification
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (NotificationBoard);

const Notification = ({
  notification,
  onDeleteNotification
}) => {
  const {
    giver,
    photo
  } = notification;
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useHistory"])();

  const generateText = () => {
    if (notification.action === "like") {
      return `${!giver.firstame ? giver.username : giver.firstname} vind je foto ${photo.title} leuk`;
    }

    if (notification.action === "comment") {
      return `${!giver.firstame ? giver.username : giver.firstname} heeft gereageerd op je foto ${photo.title}`;
    }

    if (notification.action === "follow") {
      return `${!giver.firstame ? giver.username : giver.firstname} volgt je nu!`;
    }
  };

  const goToPage = () => {
    if (notification.action === "like" || notification.action === "comment") {
      history.push(`/foto/${photo.slug}`);
    }

    if (notification.action === "follow") {
      history.push(`/fotograaf/${giver.slug}`);
    }
  };

  const deleteNotification = e => {
    e.stopPropagation();
    onDeleteNotification(notification.id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: goToPage,
    className: "flex items-center relative my-2 px-6 py-4 hover:bg-gray-100 cursor-pointer z-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    profile: notification.giver,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, generateText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-auto",
    onClick: deleteNotification
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoIosCloseCircle"], {
    className: "text-gray-500 hover:text-gray-600 text-2xl"
  }), " ")));
};

/***/ }),

/***/ "./src/components/Dashboard/SearchBox.jsx":
/*!************************************************!*\
  !*** ./src/components/Dashboard/SearchBox.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/ti */ "react-icons/ti");
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_ti__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);






const SearchBox = props => {
  const [showDropdown, setShowDropdown] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [formValue, setFormValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();

  const handleDropdown = focussed => {
    setShowDropdown(focussed);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submiteed");
    console.log(formValue);
    const urlValue = formValue.trim().replace(/\s/g, "%20");
    const url = `https://nominatim.openstreetmap.org/search/${urlValue}?format=json&addressdetails=1&limit=1`;
    const response = await fetch(url);
    console.log(response);

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json(); //console.log(json);
      //

      if (json.length > 0) {
        // the entered city can be converted to lat long
        sessionStorage.getItem("prevsettings") && sessionStorage.removeItem("prevsettings");
        props.redirect(`/fotolocaties/resultaten/?lat=${json[0].lat}&lng=${json[0].lon}`);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].error("Het lijkt erop dat je geen geldige locatie hebt ingevuld :-(");
      }
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const handleChange = e => {
    setFormValue(e.target.value);
  };

  const searchCurLoc = () => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async pos => {
      var crd = pos.coords;
      sessionStorage.getItem("prevsettings") && sessionStorage.removeItem("prevsettings");
      props.redirect(`/fotolocaties/resultaten/?lat=${crd.latitude}&lng=${crd.longitude}`);
    };

    const error = async err => {
      fetch("https://ipapi.co/json").then(res => res.json()).then(async location => {
        props.redirect(`/fotolocaties/resultaten/?lat=${location.latitude}&lng=${location.longitude}`);
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "searchBox max-w-md mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    action: "/fotolocaties/resultaten/",
    method: "get",
    id: "search-locations",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    name: "lat",
    id: "lat"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    name: "lng",
    id: "lng"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "rounded border border-gray-300 px-4 py-2 w-full top-0 left-0 focus:rounded-t",
    type: "search",
    placeholder: "Locatie zoeken",
    onFocus: () => {
      handleDropdown(true);
    },
    onBlur: () => {
      setTimeout(() => {
        handleDropdown(false);
      }, 1000);
    },
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaSearch"], {
    className: "absolute top-0 right-0 m-3 fill-current text-gray-500"
  })), showDropdown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown bg-white rounded-b border absolute w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-center items-center px-4 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ti__WEBPACK_IMPORTED_MODULE_2__["TiLocationArrow"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    onClick: searchCurLoc
  }, "Gebruik huidige locatie"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (SearchBox);

/***/ }),

/***/ "./src/components/Dashboard/SocialCard.jsx":
/*!*************************************************!*\
  !*** ./src/components/Dashboard/SocialCard.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_2__);




const SocialCard = ({
  photo
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center my-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    profile: photo.user,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "font-bold"
  }, photo.user && photo.user.firstname, " ", photo.user && photo.user.lastname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs text-gray-500"
  }, photo.createdAt.toLocaleString()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: `rounded block max-w-none w-full h-64 object-cover`,
    style: {
      backgroundColor: "grey",
      width: "480",
      height: "320"
    },
    src: photo.photo[0].url.replace(/-original|-watermark|-thumbnail/gi, "-small"),
    alt: photo.title
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (SocialCard);

/***/ }),

/***/ "./src/components/FindNearbyLocations.jsx":
/*!************************************************!*\
  !*** ./src/components/FindNearbyLocations.jsx ***!
  \************************************************/
/*! exports provided: findNearbyLocations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNearbyLocations", function() { return findNearbyLocations; });
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphQLFetch.js */ "./src/graphQLFetch.js");

const findNearbyLocations = async (lat, lng, category) => {
  // calculate min and max latitudes
  //echo 'submit';
  //const lat = this.state.photo.latitude;
  //const lng = this.state.photo.longitude;
  category && console.log(category);
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  console.log(lat, lng);
  const distance = 75; //in km

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


  const query = `query locationsInRange($minlat:Float!, $maxlat:Float!, $minlng:Float!, $maxlng:Float! $cat:String){
        locations(where:{latitude_gte:$minlat,latitude_lte:$maxlat,longitude_gte:$minlng,longitude_lte:$maxlng,location_categories:$cat}) {
        title
        longitude
        latitude
		id
		location_categories {
			label
      value
      id
			locations {
        title
        id
			}
		}
		slug
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
    minlat: parseFloat(minlat),
    maxlat: parseFloat(maxlat),
    minlng: parseFloat(minlng),
    maxlng: parseFloat(maxlng)
  };

  if (category != "") {
    search.cat = category;
  } //console.log(query, search);


  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(query, search, true);
  console.log("result from FindNearbyLocations", result);

  if (result.locations.length > 0) {
    //console.log("found locations", result.locations);
    // show only locations where a photo is linked to it
    const locations = result.locations.filter(location => location.photos.length > 0); //sort items on distance

    locations.forEach(location => {
      // lat and lng are from this.state.photo
      const locDistance = distanceFromLocation(location.latitude, location.longitude, lat, lng);
      location["distance"] = locDistance;
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
};

/***/ }),

/***/ "./src/components/Footer.jsx":
/*!***********************************!*\
  !*** ./src/components/Footer.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Footer = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-gray-900 py-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container px-6 m-auto text-gray-800 block sm:flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs uppercase text-gray-500 font-medium"
  }, "Home"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Services ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Products ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "About Us ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Pricing ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Partners ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }, "New"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs uppercase text-gray-500 font-medium"
  }, "User"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Sign in ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "New Account ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Demo ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }, "New")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Career", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }, "We're hiring")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Surveys ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }, "New"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs uppercase text-gray-500 font-medium"
  }, "Resources"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Documentation", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Tutorials ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Support ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }, "New"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs uppercase text-gray-500 font-medium"
  }, "Support"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Help Center ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Privacy Policy", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "my-3 block text-white",
    href: "/#"
  }, "Conditions ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-teal-600 text-xs p-1"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-gray-900 pt-2 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex pb-5 px-6 m-auto pt-5 border-t text-white text-sm flex-col md:flex-row container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mt-2"
  }, "\xA9 Copyright 2020. All Rights Reserved."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "md:flex-auto md:flex-row-reverse mt-2 flex-row flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/#",
    className: "w-6 mx-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: "fill-current cursor-pointer text-gray-500 hover:text-gray-400",
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    id: "Facebook",
    d: "M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422 0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784 -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
  }))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/components/LocationCards.jsx":
/*!******************************************!*\
  !*** ./src/components/LocationCards.jsx ***!
  \******************************************/
/*! exports provided: LocationHashtag, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationHashtag", function() { return LocationHashtag; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_2__);





const LocationCard = ({
  location,
  size,
  active
}) => {
  let cardClass;
  let imageClass;
  let imageStyle;

  if (!size) {
    cardClass = "w-48 h-48 mr-4 lg:w-64 lg:h-64 locationCard";
    imageClass = "w-auto h-full";
    imageStyle = {
      backgroundColor: "grey",
      transform: "translateX(-50%)",
      left: "50%"
    };
  } else {
    if (size === "large") {
      cardClass = active ? "w-full h-48 mb-4 border-4 border-red-500" : "w-full h-48 mb-4";
      imageClass = "w-full h-48 object-cover";
      imageStyle = {
        backgroundColor: "grey",
        transform: "translateY(-50%)",
        top: "50%"
      };
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `relative overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out ${cardClass}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "absolute w-full h-full top-0 left-0 z-10",
    to: `/fotolocatie/${location.slug}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: `absolute block max-w-none ${imageClass}`,
    style: imageStyle,
    src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
    alt: `Bekijk locatie ${location.title}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute w-100 bottom-0 left-0 px-3 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-white text-sm"
  }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationHashtag, {
    key: category.id,
    category: category
  })))));
};

const LocationHashtag = ({
  category
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-400 mr-2 text-xs inline-block"
  }, "#", category.label.toLowerCase());
};
/* harmony default export */ __webpack_exports__["default"] = (LocationCard);

/***/ }),

/***/ "./src/components/Results/CategorieFilter.jsx":
/*!****************************************************!*\
  !*** ./src/components/Results/CategorieFilter.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const CategorieFilter = ({
  categories,
  active,
  onFilterChange
}) => {
  const [filteredCategories, setFilteredCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (active) setValue(active);

    const _filteredCategories = categories.reduce((newCats, categoryArr) => {
      categoryArr.map(category => {
        const duplicateArr = newCats.filter(index => {
          return index.label === category.label;
        });

        if (duplicateArr.length === 0) {
          newCats.push(category);
        }

        return newCats;
      });
      return newCats;
    }, []);

    setFilteredCategories(_filteredCategories);
  }, []);

  const onChange = e => {
    setValue(e.target.value);

    if (e.target.value === "alle") {
      onFilterChange(e, true);
    } else {
      onFilterChange(e, false);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    value: value,
    onChange: onChange,
    name: "category",
    id: "category",
    className: "border p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "alle"
  }, "Alle"), filteredCategories.map(category => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: category.id,
      value: category.id
    }, category.label);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (CategorieFilter);

/***/ }),

/***/ "./src/components/Results/LocationList.jsx":
/*!*************************************************!*\
  !*** ./src/components/Results/LocationList.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationCards_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LocationCards.jsx */ "./src/components/LocationCards.jsx");





const LocationList = ({
  location,
  active,
  selectLocation
}) => {
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
  let cardClass = active ? "w-full mb-1 border-2 border-green-500" : "w-full mb-1 border-2 border-white";

  const goToLocation = (slug, id) => {
    let data = [];

    if (sessionStorage.getItem("visitedLocations")) {
      data = JSON.parse(sessionStorage.getItem("visitedLocations"));
    }

    if (data.indexOf(id) === -1) {
      data.push(id);
    }

    sessionStorage.setItem("visitedLocations", JSON.stringify(data));
    history.push(`/fotolocatie/${slug}`);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onMouseOver: () => {
      selectLocation(location.id);
    },
    onMouseOut: () => {
      selectLocation("");
    },
    className: `relative shadow hover:shadow-lg transition ease-in-out rounded ${cardClass}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center p-1",
    onClick: () => {
      goToLocation(location.slug, location.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: `rounded block max-w-none w-20 h-16 object-cover`,
    style: {
      backgroundColor: "grey"
    },
    src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
    alt: `Bekijk locatie ${location.title}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-5 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-black text-lg"
  }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_3__["LocationHashtag"], {
    key: category.id,
    category: category
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationList);

/***/ }),

/***/ "./src/components/Results/ResultMap.jsx":
/*!**********************************************!*\
  !*** ./src/components/Results/ResultMap.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_visitedMarker_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/visitedMarker.svg */ "./src/images/visitedMarker.svg");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);








const ResultMap = ({
  locations,
  selectLocation,
  active
}) => {
  const [bounds, setBounds] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [showMap, setShowMap] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [hoverIcon, setHoverIcon] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [locIcon, setLocIcon] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [visitedIcon, setVisIcon] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [visitedLocations, setVisitedLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [prevSettings, setPrevSettings] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [dynamicBounds, setDynamicBounds] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();

  const loadMap = () => {
    // loading leaflet in componentDidMount because it doenst support SSR
    const L = __webpack_require__(/*! leaflet */ "leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    const _hoverIcon = new L.Icon({
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id
    });

    const _locIcon = new L.Icon({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id
    });

    const _visIcon = new L.Icon({
      iconUrl: _images_visitedMarker_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
      iconRetinaUrl: _images_visitedMarker_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id
    });

    setHoverIcon(_hoverIcon);
    setLocIcon(_locIcon);
    setVisIcon(_visIcon); // get users position

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }; //const bounds = Leaflet.latLngBounds([position, position2]);

    const _bounds = L.latLngBounds(locations.map(location => {
      return [location.latitude, location.longitude];
    }));

    setBounds(_bounds);

    if (sessionStorage.getItem("visitedLocations")) {
      setVisitedLocations(JSON.parse(sessionStorage.getItem("visitedLocations")));
    }

    if (sessionStorage.getItem("prevsettings")) {
      console.log("getItem prevsettings if");
      setPrevSettings(JSON.parse(sessionStorage.getItem("prevsettings")));
      setBounds(null);
    } else {
      setDynamicBounds(dynamicBounds.bounds = _bounds);
      console.log({
        dynamicBounds
      });
    }

    setShowMap(true);
  }; // useConstructor(() => {
  //   loadMap();
  // });


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    loadMap();
  }, []);

  const goToLocation = (slug, id) => {
    let data = [];

    if (sessionStorage.getItem("visitedLocations")) {
      data = JSON.parse(sessionStorage.getItem("visitedLocations"));
    }

    if (data.indexOf(id) === -1) {
      data.push(id);
    }

    sessionStorage.setItem("visitedLocations", JSON.stringify(data));
    history.push(`/fotolocatie/${slug}`);
  };

  const onViewportChanged = viewport => {
    console.log(viewport);
    setPrevSettings(viewport);
    sessionStorage.setItem("prevsettings", JSON.stringify(viewport));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, showMap && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__["Map"], {
    center: prevSettings ? prevSettings.center : [52.0841037, 4.9424092],
    zoom: prevSettings ? prevSettings.zoom : 13 // center={[52.0841037, 4.9424092]}
    // zoom={13}
    ,
    scrollWheelZoom: false,
    className: "resultMap w-full",
    id: "photoLocation",
    onViewportChanged: onViewportChanged,
    bounds: bounds || null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__["TileLayer"], {
    attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), locations.map(location => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__["Marker"], {
      position: [location.latitude, location.longitude],
      key: location.id,
      onMouseOver: () => {
        console.log("check", active, location.id);
        selectLocation(location.id);
      },
      onMouseOut: () => {
        selectLocation("");
      },
      className: "hover:translate-x-2 bg-black border border-red-500",
      icon: active === location.id ? hoverIcon : visitedLocations.indexOf(location.id) !== -1 ? visitedIcon : locIcon
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_1__["Popup"], {
      autoPan: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "font-bold text-large block mb-2"
    }, location.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: ` block max-w-none w-full h-18 object-cover`,
      src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
      alt: `Bekijk locatie ${location.title}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-blue-400 font-bold text-large mt-2",
      onClick: () => {
        goToLocation(location.slug, location.id);
      }
    }, "Bekijk fotolocatie \xBB")));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ResultMap);

/***/ }),

/***/ "./src/components/Results/Results.jsx":
/*!********************************************!*\
  !*** ./src/components/Results/Results.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResultMap.jsx */ "./src/components/Results/ResultMap.jsx");
/* harmony import */ var _CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CategorieFilter.jsx */ "./src/components/Results/CategorieFilter.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LocationList.jsx */ "./src/components/Results/LocationList.jsx");


/* to support IE */








const Results = props => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [filteredLocations, setFilteredLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [activeFilter, setActiveFilter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [selectedLocation, setSelectedLocation] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showMap, setShowMap] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  let location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useLocation"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    !locations && getLocations();

    const _activeFilter = getActiveFilter();

    if (locations) {
      const _filteredLocations = locations.filter(location => {
        const include = location.location_categories.filter(categorie => {
          if (categorie.id === _activeFilter) {
            return true;
          } else {
            return false;
          }
        }); //console.log(location.id, include);

        if (include.length > 0) return true;
      });

      setFilteredLocations(_filteredLocations);
    } //console.log(_filteredLocations);

  }, [location]);

  const getLocations = async () => {
    let _locations = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    console.log(_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData, _locations);
    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_locations) {
      console.log("getting locations");
      _locations = await Results.fetchData(null, location.search);
    }

    setLocations(_locations.filter(location => location.photos.length > 0));
    console.log(_locations);
  };

  const getActiveFilter = () => {
    const params = new URLSearchParams(location.search);

    const _activeFilter = params.get("categorie") ? params.get("categorie") : "";

    if (_activeFilter) {
      return _activeFilter;
    } else {
      return false;
    }
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])(() => {
    const _activeFilter = getActiveFilter();

    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    }

    getLocations();
    setShowMap(true);
  });

  const onFilterChange = (e, reset) => {
    const params = new URLSearchParams(location.search);
    const vars = {};
    if (params.get("lat")) vars.lat = params.get("lat");
    if (params.get("lng")) vars.lng = params.get("lng");
    let url = "";

    if (reset) {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}`;
    } else {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}&categorie=${e.target.value}`;
    }

    history.push(url);
  };

  const selectLocation = locationId => {
    setSelectedLocation(locationId);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative h-screen"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full p-4 h-screen overflow-scroll"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Resultaten"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-2 flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mr-2"
  }, "Filter op categorie:"), locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeFilter,
    onFilterChange: onFilterChange,
    categories: filteredLocations.map(location => {
      return location.location_categories;
    })
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeFilter,
    onFilterChange: onFilterChange,
    categories: locations.map(location => {
      return location.location_categories;
    })
  }))), locations && (filteredLocations.length > 0 ? filteredLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))) : locations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-10 w-full h-full"
  }, showMap && locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: filteredLocations,
    selectLocation: selectLocation,
    active: selectedLocation
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: locations,
    selectLocation: selectLocation,
    active: selectedLocation
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Results);

Results.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility
  const params = new URLSearchParams(search);
  console.log("fetching data");
  const vars = {};
  if (params.get("lat")) vars.lat = params.get("lat");
  if (params.get("lng")) vars.lng = params.get("lng"); //vars.cat = params.get("categorie") ? params.get("categorie") : "";

  console.log(vars);

  const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(vars.lat, vars.lng);

  console.log(_locations);
  return _locations;
};

/***/ }),

/***/ "./src/components/UserProfilePicture.jsx":
/*!***********************************************!*\
  !*** ./src/components/UserProfilePicture.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);



const UserProfilePicture = ({
  profile,
  size = 16
}) => {
  return profile.profilePicture !== null && profile.profilePicture !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "imagePreview",
    className: `relative h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4} overflow-hidden rounded-full`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: `w-auto h-${size} sm:h-${size + 4} sm:w-${size + 4} rounded-full mb-2`,
    src: profile.profilePicture.url
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "imagePreview",
    className: `relative h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4} overflow-hidden rounded-full`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `fill-current h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4} mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaUserSecret"], {
    className: "text-2xl"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (UserProfilePicture);

/***/ }),

/***/ "./src/components/favButton.jsx":
/*!**************************************!*\
  !*** ./src/components/favButton.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);



const favButton = ({
  favourite,
  updateFav,
  user,
  likedId,
  addTitle,
  removeTitle,
  receiver
}) => {
  const [loading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [liked, setLiked] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(favourite);

  const onBtnClick = () => {
    liked ? updateFav(user, likedId, "remove", receiver) : updateFav(user, likedId, "add", receiver);
    setLiked(!liked);
  };

  const heartClass = !liked ? `inline-block bg-white rounded py-2 px-3 h-8 text-gray-500 hover:text-red-500` : `inline-block bg-white rounded py-2 px-3 h-8 text-red-500`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "revealTooltip mb-2 flex pointer justify-end items-center",
    onClick: loading ? () => {} : onBtnClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hidden inline-block bg-white rounded py-1 px-3 h-8"
  }, !liked ? addTitle : removeTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: heartClass
  }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaSpinner"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaHeart"], null)));
};

/* harmony default export */ __webpack_exports__["default"] = (favButton);

/***/ }),

/***/ "./src/components/followButton.jsx":
/*!*****************************************!*\
  !*** ./src/components/followButton.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_1__);



const followButton = ({
  follow,
  updateFollow,
  followId
}) => {
  const [loading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [followed, setFollowed] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(follow);

  const onBtnClick = () => {
    console.log("clicked");
    followed ? updateFollow(followId) : updateFollow(followId);
    setFollowed(!followed);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setFollowed(follow);
  }, [follow]);
  const followIcon = !followed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_1__["FiPlus"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_1__["FiMinus"], null);
  const followClass = !followed ? `cursor-pointer my-1 rounded w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 text-xs flex justify-center items-center followProfile` : `cursor-pointer my-1 rounded w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-2 py-2 text-xs flex justify-center items-center followProfile`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: loading ? () => {} : onBtnClick,
    className: followClass
  }, followIcon, !followed ? ` Volgen` : ` Ontvolgen`);
};

/* harmony default export */ __webpack_exports__["default"] = (followButton);

/***/ }),

/***/ "./src/components/notificationCenter/notifications.jsx":
/*!*************************************************************!*\
  !*** ./src/components/notificationCenter/notifications.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io */ "react-icons/io");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");





const Notifications = ({
  user,
  onClick,
  show
}) => {
  const [notifications, setNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setNotifications(user.receivedNotifications);
  }, [user.receivedNotifications]);

  const deleteNotification = async id => {
    const oldNotifications = notifications;

    const _notifications = notifications.filter(notification => {
      return notification.id != id;
    });

    setNotifications(_notifications);
    const query = `mutation deleteNotification($id:ID!){
        deleteNotification(input: { where: { id: $id } }) {
          notification {
            id
          }
        }
      }`;
    let vars = {};
    vars.id = id;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__["default"])(query, vars, true);

    if (!data.deleteNotification.notification) {
      setNotifications(oldNotifications);
    }
  };

  if (!show) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, notifications && notifications.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rounded-full bg-red-500 text-white absolute top-0 -mt-1 right-0 -mr-1 text-xs w-5 h-5 flex items-center justify-center"
    }, notifications.length));
  } else {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, notifications && notifications.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rounded-full bg-red-500 text-white absolute top-0 -mt-1 right-0 -mr-1 text-xs w-5 h-5 flex items-center justify-center"
    }, notifications.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "absolute bg-white rounded py-6 border z-20 right-0 shadow-lg",
      id: "notifications"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-black pl-6"
    }, "Meldingen"), notifications && !notifications.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "my-2 px-6 py-4"
    }, "Er zijn geen notificaties voor je!") : notifications && notifications.map(notification => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Notification, {
        onClick: onClick,
        key: notification.id,
        notification: notification,
        onDeleteNotification: deleteNotification
      });
    })));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Notifications);

const Notification = ({
  notification,
  onClick,
  onDeleteNotification
}) => {
  const {
    giver,
    photo
  } = notification;

  const generateText = () => {
    if (notification.action === "like") {
      return `${!giver.firstame ? giver.username : giver.firstname} vind je foto ${photo.title} leuk`;
    }

    if (notification.action === "comment") {
      return `${!giver.firstame ? giver.username : giver.firstname} heeft gereageerd op je foto ${photo.title}`;
    }

    if (notification.action === "follow") {
      return `${!giver.firstame ? giver.username : giver.firstname} volgt je nu!`;
    }
  };

  const goToPage = () => {
    if (notification.action === "like" || notification.action === "comment") {
      onClick(`/foto/${photo.slug}`);
    }

    if (notification.action === "follow") {
      onClick(`/fotograaf/${giver.slug}`);
    }
  };

  const deleteNotification = e => {
    e.stopPropagation();
    onDeleteNotification(notification.id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: goToPage,
    className: "flex items-center relative my-2 px-6 py-4 hover:bg-gray-100 cursor-pointer z-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    profile: notification.giver,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, generateText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-auto",
    onClick: deleteNotification
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoIosCloseCircle"], {
    className: "text-gray-500 hover:text-gray-600 text-2xl"
  }), " ")));
};

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

/***/ "./src/images/visitedMarker.svg":
/*!**************************************!*\
  !*** ./src/images/visitedMarker.svg ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "bcaf5cb2422e718038f690e92846255a.svg");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoDetailStrapi.jsx */ "./src/PhotoDetailStrapi.jsx");
/* harmony import */ var _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocationDetailStrapi.jsx */ "./src/LocationDetailStrapi.jsx");
/* harmony import */ var _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoAddStrapi.jsx */ "./src/PhotoAddStrapi.jsx");
/* harmony import */ var _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoAddToLocation.jsx */ "./src/PhotoAddToLocation.jsx");
/* harmony import */ var _Home_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Home.jsx */ "./src/Home.jsx");
/* harmony import */ var _NotFound_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NotFound.jsx */ "./src/NotFound.jsx");
/* harmony import */ var _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BlogPost.jsx */ "./src/BlogPost.jsx");
/* harmony import */ var _RegisterHooks_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RegisterHooks.jsx */ "./src/RegisterHooks.jsx");
/* harmony import */ var _LoginHooks_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoginHooks.jsx */ "./src/LoginHooks.jsx");
/* harmony import */ var _Logout_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Logout.jsx */ "./src/Logout.jsx");
/* harmony import */ var _ForgotPassword_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ForgotPassword.jsx */ "./src/ForgotPassword.jsx");
/* harmony import */ var _PasswordReset_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PasswordReset.jsx */ "./src/PasswordReset.jsx");
/* harmony import */ var _Profile_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Profile.jsx */ "./src/Profile.jsx");
/* harmony import */ var _FBConnect_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FBConnect.jsx */ "./src/FBConnect.jsx");
/* harmony import */ var _ProfileEdit_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ProfileEdit.jsx */ "./src/ProfileEdit.jsx");
/* harmony import */ var _components_CategorySearch_LocationsPerCategorie_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/CategorySearch/LocationsPerCategorie.jsx */ "./src/components/CategorySearch/LocationsPerCategorie.jsx");
/* harmony import */ var _components_Results_Results_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/Results/Results.jsx */ "./src/components/Results/Results.jsx");
/* harmony import */ var _components_Dashboard_Dashboard_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/Dashboard/Dashboard.jsx */ "./src/components/Dashboard/Dashboard.jsx");
/* harmony import */ var _components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/notificationCenter/notifications.jsx */ "./src/components/notificationCenter/notifications.jsx");



















const routes = [{
  path: "/aanmelden",
  component: _RegisterHooks_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
  exact: true
}, {
  path: "/inloggen",
  component: _LoginHooks_jsx__WEBPACK_IMPORTED_MODULE_8__["default"],
  exact: true
}, {
  path: "/uitloggen",
  component: _Logout_jsx__WEBPACK_IMPORTED_MODULE_9__["default"],
  exact: true
}, {
  path: "/wachtwoord-vergeten",
  component: _ForgotPassword_jsx__WEBPACK_IMPORTED_MODULE_10__["default"],
  exact: true
}, {
  path: "/wachtwoord-resetten",
  component: _PasswordReset_jsx__WEBPACK_IMPORTED_MODULE_11__["default"],
  exact: true
}, {
  path: "/foto/toevoegen",
  component: _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_2__["default"],
  exact: true
}, {
  path: "/foto/toevoegen/:id",
  component: _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_3__["default"],
  exact: true
}, {
  path: "/fotograaf/:slug",
  component: _Profile_jsx__WEBPACK_IMPORTED_MODULE_12__["default"],
  exact: true
}, {
  path: "/foto/:id",
  component: _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__["default"],
  exact: true
}, {
  path: "/fotolocatie/:id",
  component: _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_1__["default"],
  exact: true
}, {
  path: "/fotolocaties/categorie/:value",
  component: _components_CategorySearch_LocationsPerCategorie_jsx__WEBPACK_IMPORTED_MODULE_15__["default"],
  exact: true
}, {
  path: "/fotolocaties/resultaten",
  component: _components_Results_Results_jsx__WEBPACK_IMPORTED_MODULE_16__["default"],
  exact: true
}, //{ path: "/fotos", component: PhotoListStrapi },
{
  path: "/connect/facebook",
  component: _FBConnect_jsx__WEBPACK_IMPORTED_MODULE_13__["default"]
}, //{ path: "/bewerken/:id", component: PhotoEdit, exact: true },
{
  path: "/profiel/bewerken/:slug",
  component: _ProfileEdit_jsx__WEBPACK_IMPORTED_MODULE_14__["default"]
}, //{ path: "/report", component: PhotoReport },
//{ path: "/about", component: About },
{
  path: "/",
  component: _Home_jsx__WEBPACK_IMPORTED_MODULE_4__["default"],
  exact: true
}, {
  path: "/dashboard",
  component: _components_Dashboard_Dashboard_jsx__WEBPACK_IMPORTED_MODULE_17__["default"],
  exact: true
}, {
  path: "/niet-gevonden",
  component: _NotFound_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
  exact: true
}, {
  path: "/*",
  component: _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/services/authService.js":
/*!*************************************!*\
  !*** ./src/services/authService.js ***!
  \*************************************/
/*! exports provided: register, setToken, login, logout, checkAvailability, getCurrentUser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAvailability", function() { return checkAvailability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUser", function() { return getCurrentUser; });
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jwt-decode */ "jwt-decode");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_1__);


const tokenKey = "token";
async function register(input) {
  const query = `mutation register($input: UsersPermissionsRegisterInput!) {
            register(input: $input) {
                jwt
                user {
                  id
                  email
                  username
                  slug
                }
            }
          } `;
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(query, {
    input
  }, true, true);
  console.log(result);

  if (!result.errors) {
    // user registered and getting JWT token!
    const {
      register: {
        jwt
      }
    } = result;
    localStorage.setItem(tokenKey, jwt);
    return true;
  } else {
    return result.errors[0];
  }
}
function setToken(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
async function login(input) {
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
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(query, {
    input
  }, true, true); //console.log(result);

  console.log(result);

  if (!result.errors) {
    // user registered and getting JWT token!
    const {
      login: {
        jwt
      }
    } = result;
    localStorage.setItem(tokenKey, jwt);
    return true;
  } else {
    return result.errors[0];
  }
}
function logout() {
  localStorage.removeItem(tokenKey);
}
async function checkAvailability(type, value) {
  const query = `query checkAvailability($${type}:String!){
    users( where: { ${type}: $${type} }) {
      ${type}
    }
  } `;
  console.log(query, type, value);
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(query, value, true, true);
  console.log(result);
  console.log(result.users.length);

  if (result.users.length > 0) {
    return false;
  } else {
    return true;
  }
}
async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey); //console.log("jwt", jwt);

    const userId = jwt_decode__WEBPACK_IMPORTED_MODULE_1___default()(jwt).id;
    const query = `query getUser($id:ID!) {
            user(id: $id) {
                id
                email
                username
                slug
                receivedNotifications {
                  id
                  photo {
                    title
                    id
                    slug
                  }
                  action
                  giver {
                    id
                    firstname
                    lastname
                    slug
                    username
                    profilePicture {
                      url
                    }
                  }
                }
                followings {
                  id
                }
                favouriteLocations {
                  id
                }
                likedPhotos {
                  id
                }
                photos {
                id
                }
            }
            } `;
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(query, {
      id: userId
    }, true, true); //console.log(result);

    if (result) {
      return result.user;
    }
  } catch (ex) {
    return null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = ({
  login,
  logout,
  getCurrentUser,
  register,
  setToken,
  checkAvailability
});

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

/***/ "./src/services/userContext.js":
/*!*************************************!*\
  !*** ./src/services/userContext.js ***!
  \*************************************/
/*! exports provided: userContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userContext", function() { return userContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const userContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  user: {}
}); // Create a context object

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
  mode: "development",
  entry: {
    app: ["./browser/App.jsx"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [// Creates `style` nodes from JS strings
      "style-loader", // Translates CSS into CommonJS
      "css-loader", {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [__webpack_require__(/*! tailwindcss */ "tailwindcss"), __webpack_require__(/*! autoprefixer */ "autoprefixer")]
          }
        }
      }, // Compiles Sass to CSS
      "sass-loader"]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {
            targets: {
              ie: "11",
              edge: "15",
              safari: "10",
              firefox: "50",
              chrome: "49"
            }
          }], "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [{
        loader: "file-loader"
      }]
    }]
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all"
    }
  },
  plugins: [new webpack.DefinePlugin({
    __isBrowser__: "true"
  })],
  devtool: "source-map"
};
const serverConfig = {
  mode: "development",
  entry: {
    server: ["./server/uiserver.js"]
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {
            targets: {
              node: "10"
            }
          }], "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [{
        loader: "file-loader"
      }]
    }]
  },
  plugins: [new webpack.DefinePlugin({
    __isBrowser__: "false"
  })],
  devtool: "source-map"
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

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

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

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

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

/***/ "react-cool-img":
/*!*********************************!*\
  !*** external "react-cool-img" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-cool-img");

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

/***/ "react-icons/cg":
/*!*********************************!*\
  !*** external "react-icons/cg" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/cg");

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

/***/ "react-icons/go":
/*!*********************************!*\
  !*** external "react-icons/go" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/go");

/***/ }),

/***/ "react-icons/io":
/*!*********************************!*\
  !*** external "react-icons/io" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/io");

/***/ }),

/***/ "react-icons/io5":
/*!**********************************!*\
  !*** external "react-icons/io5" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/io5");

/***/ }),

/***/ "react-icons/md":
/*!*********************************!*\
  !*** external "react-icons/md" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/md");

/***/ }),

/***/ "react-icons/ti":
/*!*********************************!*\
  !*** external "react-icons/ti" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/ti");

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

/***/ "react-sanitized-html":
/*!***************************************!*\
  !*** external "react-sanitized-html" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-sanitized-html");

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

/***/ "swiper/react":
/*!*******************************!*\
  !*** external "swiper/react" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper/react");

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