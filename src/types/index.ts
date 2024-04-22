type Gender = "male" | "female";

export type User = {
	gender: Gender;
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		street: {
			number: number;
			name: string;
		};
		city: string;
		state: string;
		country: string;
		postcode: number;
		coordinates: {
			latitude: string;
			longitude: string;
		};
		timezone: {
			offset: string; //"+9:00";
			description: string;
		};
	};
	email: string; //	"noah.wright@example.com";
	login: {
		uuid: string; //"cfe0379e-8d13-4ffe-900c-4a4c610cb7b1";
		username: string; //"angrypeacock374";
		password: string; //"88888888";
		salt: string; //"IYhl9862";
		md5: string; //"2c204137f90972ce3d987155fbbec082";
		sha1: string; //"778e3417938111ea3e0efc19c7ca3f7e9b32a650";
		sha256: string; //"adbb14d8b3afe87b15c07014f9f541a145f67c7a1899fcd1ab05feff92a29f6c";
	};
	dob: {
		date: string; //"1983-02-10T00:04:32.668Z";
		age: number;
	};
	registered: {
		date: string; //"2007-06-12T00:04:55.081Z";
		age: number;
	};
	phone: string; //"(410)-774-6077";
	cell: string; //"(377)-138-9386";
	id: {
		name: string;
		value: string;
	};
	picture: {
		large: string; //"https://randomuser.me/api/portraits/men/77.jpg";
		medium: string; //"https://randomuser.me/api/portraits/med/men/77.jpg";
		thumbnail: string; //"https://randomuser.me/api/portraits/thumb/men/77.jpg";
	};
	nat: string; // "NZ";
};
