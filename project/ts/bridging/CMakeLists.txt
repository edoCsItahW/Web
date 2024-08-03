cmake_minimum_required(VERSION 3.28.1)

project(BRIDGING VERSION 1.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include_directories(${CMAKE_JS_INC})
file(GLOB SOURCE_FILES "*.cpp")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} ${CMAKE_SOURCE_DIR}/python311.lib ${CMAKE_SOURCE_DIR}/node.lib)

include(pybind11.cmake)
include(node.cmake)

execute_process(
        COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
)

string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})


add_definitions(-DNAPI_VERSION=4)
