# 기본사항

이 프로젝트는 Node.js Design Pattern 3rd 내용을 기반으로 합니다. \
책의 실습환경을 가능한 최신 버전에 맞게 수정하였으며 초기설정은 저의 다른 프로젝트인 [ts-yarn2-sterter 프로젝트](https://github.에com/codelab-kr/ts-yarn2-starter) 를 참고하시기 바랍니다.

- Node.js v21.1.0
- yarn v4.0.2
- typescript ^5.3.0

<br>

# Node.js

```mermaid
---
tile: Node.js
---

flowchart LR
	subgraph JS_Application
		subgraph JSCode
		end
	end

	subgraph Node.js_API
		direction LR
		fs
		HTTP
		crypto
		buffer
	end

	subgraph Node.js_라이브러리
		direction LR
		Node.js_바인딩
		Node.js_표준_라이브러리
    C++에드온
	end



	subgraph V8엔진
		subgraph JIT_컴파일러
			direction LR
			Parser{Parser} --> AST(추상구문트리-AST) --> Interpriter{이그니션 인터프리터} -- 최적화 의뢰 --> Complirer{터보팬 컴파일러}
			Complirer --최적화-실패 --- 최적화해제 --> Interpriter

			subgraph CODE
				BYTE(바이트 코드)
				BINARY(바이너리 코드)
			end

			Interpriter --> BYTE
			Complirer --최적화-성공 --> BINARY
		end

    subgraph 메모리힙
      O(객체)
      DD(동적 데이터)
    end


    subgraph 콜스택
      direction LR
      F2(비동기요청)
      F1(동기요청)
			F0(global 함수)
    end



    CODE --- 콜스택
    CODE --- 메모리힙
	  메모리힙 ---미사용--> G{가비지콜렉터}

	end

	subgraph libuv라이브러리
  	subgraph 이벤트_디멀티플렉서
      direction LR
			E1(리소스-오퍼레이터-핸들러)
		end

		subgraph Main_Thread_내_이벤트_루프
			direction LR
			subgraph 이벤트큐
				direction LR

	      subgraph microTask_큐
					direction LR
		      subgraph nextTick큐
						process.nextTick_CB
			    end
		      subgraph microTask큐
						Promise_CB
			    end
		    end				
	      subgraph 타이머큐
					SetTimeout_CB
					SetInterval_CB
		    end
				subgraph I/O큐
					direction TB
		      subgraph 팬딩I/O큐
						팬딩I/O_CB
			    end
		      subgraph 유휴-준비
						내부사용
			    end
		      subgraph Poll큐
						direction LR
						fs_CB
						http_CB
						...
			    end
				end

	      subgraph 체크큐
					SetImmediate_CB
		    end
	      subgraph 클로즈큐
					클로즈핸들러_CB
		    end


			end
		end

		subgraph uv_io
			direction LR
			subgraph uv_io_t
				I/O폴링
			end

			subgraph 스레드풀
				direction LR
				TH1(스레드)
				TH2(스레드)
			end

			subgraph 워커스레드
				direction LR
				WT1(워커스레드)
				WT2(워커스레드)
			end

			Poll큐
		end

  	subgraph 비동기작업처리
				direction LR
		end

		F2 --- E1 --- 비동기작업처리
		비동기작업처리 -- 기본 OS 지원 O (네트워크 요청...) --- uv_io_t
    비동기작업처리 -- 기본 OS 지원 X (암호화, 압축, 파일...) --- 스레드풀
    비동기작업처리 -- CPU 작업 --> 워커스레드
		E1 --콜백등록--- 이벤트큐


		subgraph C/C++컴포넌트
			direction LR
			subgraph 네트워크I/O
				direction LR
				TCP
				UDP
				TTY
	      파이프
				HTTP_파서
				OpenSSL
			end
			subgraph DNS옵션
				C_ares
			end
			subgraph 파일I/O
			end
			subgraph 유저코드
			end
			zlib
		end
    스레드풀 --- C/C++컴포넌트
	end


	subgraph OS
		direction LR
		subgraph 커널
			subgraph 비동기지원
				epoll-리눅스
	      kqueque-맥OS
	      IOCP-윈도우
			end
    end
		subgraph 그외
			subgraph 파일시스템
			end
			subgraph 네트워크시스템
			end
		end
	end

uv_io_t --- 비동기지원
C/C++컴포넌트 --- 그외
Node.js_라이브러리 ---  Node.js_API
Node.js_API  --- JS_Application
JSCode --- Parser

```
