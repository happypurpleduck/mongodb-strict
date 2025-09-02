import type { ObjectId } from "mongodb";
import type { Filter } from "../types/filter.ts";
import { bench } from "@ark/attest";

bench("Filter simple object", () => {
	return {} as Filter<{ a: number; b: string }>;
}).types([5253, "instantiations"]);

bench("Filter with literals", () => {
	return {} as Filter<{ status: "active" | "inactive"; count: number }>;
}).types([52363, "instantiations"]);

bench("Filter meaningful object", () => {
	return {} as Filter<{
		user: { name: string; age: number };
		tags: string[];
		metadata: { created: Date; updated: Date };
	}>;
}).types([7574, "instantiations"]);

bench("Filter meaningfully complex object", () => {
	return {} as Filter<{
		user: {
			name: string;
			age: number;
		};
		children: Array<{
			name: string;
			age: number;
		}>;
		tags: string[];
		metadata: {
			created: Date;
			updated: Date;
		};
	}>;
}).types([9203, "instantiations"]);

bench("Filter quite nested objects", () => {
	return {} as Filter<{
		one: {
			two: {
				three: {
					four: {
						five: {
							six: {
								seven: {
									eight: {
										nine: {
											ten: {
												eleven: {
													twelve: {
														thirteen: {
															fourteen: {
																fifteen: {
																	sixteen: {
																		seventeen: {
																			// eighteen: {
																			value: string;
																			// };
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
		onex: {
			two: {
				three: {
					four: {
						five: {
							six: {
								seven: {
									eight: {
										nine: {
											ten: {
												eleven: {
													twelve: {
														thirteen: {
															fourteen: {
																value: string;
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	}>;
}).types([31383, "instantiations"]);

bench("Filter very multiple nested objects", () => {
	return {} as Filter<{
		a: {
			b: {
				c: {
					d: {
						e: {
							f: {
								g: {
									h: {
										i: {
											j: {
												k: {
													l: {
														m: {
															n: {
																o: {
																	value: ObjectId;
																	// p: {
																	// 	q: {
																	// 		r: {
																	// 			s: {
																	// 				t: {
																	// 					w: {
																	// 						x: {
																	// 							y: {
																	// 								z: ObjectId;
																	// 							};
																	// 						};
																	// 					};
																	// 				};
																	// 			};
																	// 		};
																	// 	};
																	// };
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};

		aa: {
			b: {
				c: {
					d: {
						e: {
							f: {
								g: {
									h: {
										i: {
											j: {
												k: {
													l: {
														m: {
															n: {
																o: {
																	p: {
																		value: string;
																		// q: {
																		// 	r: {
																		// 		s: {
																		// 			t: {
																		// 				w: {
																		// 					x: {
																		// 						y: {
																		// 							z: ObjectId;
																		// 						};
																		// 					};
																		// 				};
																		// 			};
																		// 		};
																		// 	};
																		// };
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};

		aaa: {
			b: {
				c: {
					d: {
						e: {
							f: {
								g: {
									h: {
										i: {
											j: {
												k: {
													l: {
														m: {
															n: {
																o: {
																	p: {
																		value: string;
																		// q: {
																		// 	r: {
																		// 		s: {
																		// 			t: {
																		// 				w: {
																		// 					x: {
																		// 						y: {
																		// 							z: ObjectId;
																		// 						};
																		// 					};
																		// 				};
																		// 			};
																		// 		};
																		// 	};
																		// };
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	}>;
}).types([41335, "instantiations"]);
