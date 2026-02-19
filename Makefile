# Variables
ANDROID_DIR=android

.PHONY: clean build-release help
 

clean:
	@echo "Cleaning Android build artifacts..."
	cd $(ANDROID_DIR) && rm -rf .gradle .cxx app/.cxx app/build
	cd $(ANDROID_DIR) && ./gradlew clean

build-release: clean
	@echo "Starting Release build (APK)..."
	cd $(ANDROID_DIR) && ./gradlew assembleRelease
	@echo "Build complete! Check: android/app/build/outputs/apk/release/"

build-bundle: clean
	@echo "Starting Bundle build (AAB)..."
	cd $(ANDROID_DIR) && ./gradlew bundleRelease
	@echo "Build complete! Check: android/app/build/outputs/bundle/release/"