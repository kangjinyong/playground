import { Injectable } from "@angular/core";

@Injectable()
export class WindowService {
    isMobileDevice() {
		return window.screen.width <= 480 || window.screen.height <= 480;
	}
}