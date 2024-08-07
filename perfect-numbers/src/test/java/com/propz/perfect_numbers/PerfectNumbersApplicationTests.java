package com.propz.perfect_numbers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PerfectNumbersApplicationTests {

	@Autowired
	private NumbersService numbersService;

	@Autowired
	private NumbersController numbersController;

	@Test
	void contextLoads() {
		assertThat(numbersService).isNotNull();
	}

	@Test
	void shouldBePerfectNumber() {
		boolean isPerfect = numbersService.isPerfectNumber(28L);
		assertThat(isPerfect).isTrue();
	}

	@Test
	void shouldReturnPerfectNumbers() {
		var perfectNumbers = numbersService.findPerfectNumbersInRange(0L, 28L);
		assertThat(perfectNumbers).size().isEqualTo(2);
		assertThat(perfectNumbers).contains(6L);
		assertThat(perfectNumbers).contains(28L);
	}

}
